import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {Login} from "../schema/login.modle.js";
import {securityManager} from "../security/securityManager.security.js";
import {redis} from "../config/index.js";
import {generateOtp} from "../helpers/generateOtp.helper.js";
import {User} from "../schema/user.modle.js";
import {SendOtp} from "../utils/sendOtp.util.js";
import {verifyPassword} from "../services/verifyPassword.service.js";

export async function handleMultiFactorAuthentication(req,reply,done) {
    try {
        const { mail, deviceFingerPrint, securityKey } = req.body;
        const userId = securityManager.createUserId(mail);
        let user = await redis.get(`multiFactorAuthentication:${userId}`);
        if(!user){
            return reply.send(new ApiError("invalid request", 400));
        };
        user = JSON.parse(user);
        const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint, user.deviceFingerPrintHash);
        if (!verifyDevice.success) {
            return reply.send(new ApiError("invalid request", 400));
        };
        if (verifyDevice.reHash) {
            user.deviceFingerPrintHash = securityManager.createDeviceFingerPrintHash(deviceFingerPrint);
        };
        const verifySecurityKey = await verifyPassword(securityKey, user.securityKey);
        if (!verifySecurityKey) {
            return reply.send(new ApiError("wrong security key", 400));
        };
        if (user.twoFactorAuthenticationEnabled) {
            const otp = generateOtp().toString();
            const sendOtp = await SendOtp(mail,"for login", otp);
            if (!sendOtp) {
                console.log("error in sending otp");
                return reply.send(new ApiError("Internal Server Error", 500));
            };
            await redis.del(`multiFactorAuthentication:${userId}`);
            await redis.set(`twoFactorAuthentication:${userId}`, JSON.stringify({otp,deviceFingerPrintHash:user.deviceFingerPrintHash}),300);
            return reply.send(new ApiResponse({twoFactorAuthenticationEnabled:true},"success", 200));
        };
        await redis.del(`multiFactorAuthentication:${userId}`);
        const userData = await redis.get(userId);
        if (!userData) {
            userData = await User.findOne({userId});
            if (!userData) {
                return reply.send(new ApiError("User not found", 404));
            };
        };
        const saveLoginDetail = await Login.create({ userId, deviceFingerPrint });
        if (!saveLoginDetail) {
            console.log("error in saving login detail");
            return reply.send(new ApiError("Internal server error", 500));
        };
        const accessTokenPayload = {
            userId,
            deviceFingerPrint,
        };
        const refreshTokenPayload = {
            userId,
            deviceFingerPrint,
            mail:userData.mail,
            name:userData.name,
            profileImageUrl:userData.profileImageUrl,
        };
        return reply.send(new ApiResponse({
            accessToken: securityManager.createAccessToken(accessTokenPayload),
            refreshToken: securityManager.createRefreshToken(refreshTokenPayload),
        },"success", 200));
    } catch (error) {
        console.log("error in the main function of multiFactorAuthentication", error.message);
        return reply.send(new ApiError("Internal server error", 500));
    };
};