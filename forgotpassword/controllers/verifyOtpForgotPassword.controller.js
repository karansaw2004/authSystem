import {redis} from "../config/index.js";
import {ApiError} from "../err/api.err.js";
import {securityManager} from "../security/securityManager.security.js";
import {User} from "../schema/user.modle.js";
import {Login} from "../schema/login.modle.js";
import {hashPassword} from "../services/hashPassword.service.js";
import {ApiResponse} from "../res/apiResponse.res.js";

export async function handleVerifyOtpForgotPassword(req, reply) {
    try {
        const { mail, otp, deviceFingerPrint,newPassword } = req.body;
        const userId = securityManager.createUserId(mail);
        let data = await redis.get(`forgotpassword:${userId}`);
        if (!data) {
            return reply.send(new ApiError("Invalid request", 400));
        }
        data = JSON.parse(data);
        if (data.otp !== otp) {
            return reply.send(new ApiError("Invalid OTP", 400));
        };
        const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint,data.deviceFingerPrintHash);
        if(!verifyDevice.success){
            return reply.send(new ApiError("Device verification failed", 400));
        };
        if (verifyDevice.reHash) {
            data.deviceFingerPrintHash = securityManager.createDeviceFingerPrintHash(deviceFingerPrint);
        };
        const hashNewPassword = await hashPassword(newPassword);
        const updateUser = await User.findOneAndUpdate(
            { userId },
            { $set: { hashedPassword: hashNewPassword.hashedPassword } },
            { new: true }
        );
        if(!updateUser){
            return reply.send(new ApiError("User not found", 404));
        };
        const saveLoginDetail = await Login.create({
            userId: userId,
            deviceFingerPrintHash: data.deviceFingerPrintHash,
            ipAddress: req.ip,
        });
        if (!saveLoginDetail) {
            console.log("error in saving login detail");
            return reply.send(new ApiError("Internal Server error",500));
        };
        await redis.del(`forgotpassword:${userId}`);
        await redis.setWithoutExpiration(`user:${userId}`,JSON.stringify(updateUser.toObject()));
        const accessTokenPayload = {
            userId: userId,
            deviceFingerPrintHash: data.deviceFingerPrintHash
        };
        const refreshTokenPayload = {
            userId: userId,
            deviceFingerPrintHash: data.deviceFingerPrintHash,
            name: updateUser.name,
            email: updateUser.mail,
            profileImageUrl: updateUser.profileImageUrl,
        };
        return reply.send(new ApiResponse({ userId:userId,accessToken:securityManager.createAccessToken(accessTokenPayload,"1d"), refreshToken: securityManager.createRefreshToken(refreshTokenPayload,"7d") }, "success", 200));
    } catch (error) {
        console.log("error in the main function of verifyOtpForgotPassword", error.message);
        return reply.send(new ApiError("Internal server error", 500));
    };
};