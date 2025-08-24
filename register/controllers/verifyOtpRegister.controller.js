import {ApiError} from "../err/api.err.js";
import {ApiResponse}  from "../res/apiResponse.res.js";
import {redis} from "../config/index.js";
import {securityManager} from "../security/securityManager.security.js";
import {User} from "../schema/user.modle.js";
import {findLocation,findCoordinates} from "../utils/findLocation.util.js";
import mongoose from "mongoose";
import {Login} from "../schema/login.modle.js";

export async function handleVerifyOtpRegister(req, reply) {
    try {
        const { mail, otp, deviceFingerPrint } = req.body;
        const userId = securityManager.createUserId(mail);
        let data = await redis.get(`reserve:${userId}`);
        if (!data) {
            return reply.send(new ApiError("No registration found for this user", 400));
        };
        data = JSON.parse(data);
        const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint, data.deviceFingerPrintHash);
        if (verifyDevice.success === false) {
            return reply.send(new ApiError("Device fingerprint  verification failed", 401));
        };
        if (verifyDevice.reHash) {
            data.deviceFingerPrintHash = securityManager.createDeviceFingerPrintHash(deviceFingerPrint);
        }
        if (data.otp !== otp) {
            return reply.send(new ApiError("Invalid OTP", 401));
        };
        await redis.del(`reserve:${userId}`);
        const region = await findLocation(req.ip);
        const country = region?.split("-")[0] || "N/A";
        const session = await mongoose.startSession();
        let user;
        let loginDetail;
        try {
            session.startTransaction();
            user = (await User.create([
                {
                    userId,
                    mail: mail, 
                    accountBasedOn: country,
                    name: data.name,
                    hashedPassword: data.hashedPassword,
                }
            ], { session }))[0];
            loginDetail = (await Login.create([
                {
                    userId,
                    deviceFingerPrintHash: data.deviceFingerPrintHash,
                    ipAddress: req.ip
                }
            ], { session }))[0];
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
        } finally {
            session.endSession();
        };
        if (!user || !loginDetail) {
            return reply.send(new ApiError("Internal Server Error", 500));
        };
        await redis.del(`reserve:${userId}`);
        let userData = user.toObject();
        userData.deviceFingerPrintHash = data.deviceFingerPrintHash;
        await redis.setWithoutExpiration(`user:${userId}`, JSON.stringify(userData));
        const accessTokenPayload = {
            mail: user.mail,
            name: user.name,
            deviceFingerPrintHash: data.deviceFingerPrintHash,
        };
        const refreshTokenPayload = {
            userId: user.userId,
            name: user.name,
            mail: user.mail,
            deviceFingerPrintHash: data.deviceFingerPrintHash,
        };
        return reply.send(new ApiResponse({ registered:true, tokens:{accessToken:securityManager.createAccessToken(accessTokenPayload,"1d"), refreshToken:securityManager.createRefreshToken(refreshTokenPayload,"7d")}}, "success", 200));
    } catch (error) {
        console.log("error in the main handle function of the verifyOtpRegister", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    };
};