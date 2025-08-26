import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {Login} from "../schema/login.modle.js";
import {securityManager} from "../security/securityManager.security.js";
import {redis} from "../config/index.js";
import {User} from "../schema/user.modle.js";


export async function handleVerifyOtpLogin(req,reply){
    try {
        const { mail, deviceFingerPrint, otp } = req.body;
        const userId = securityManager.createUserId(mail);
        let twoFactorAuthentication = await redis.get(`twoFactorAuthentication:${userId}`);
        if(!twoFactorAuthentication){
            return reply.send(new ApiError("invalid request", 400));
        };
        twoFactorAuthentication = JSON.parse(twoFactorAuthentication);
        const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint, twoFactorAuthentication.deviceFingerPrintHash);
        if (!verifyDevice.success) {
            return reply.send(new ApiError("invalid device detected", 400));
        };
        if (verifyDevice.reHash) {
            twoFactorAuthentication.deviceFingerPrintHash = securityManager.createDeviceFingerPrintHash(deviceFingerPrint);
        };
        if (twoFactorAuthentication.otp !== otp) {
            return reply.send(new ApiError("invalid otp", 400));
        };
        await redis.del(`twoFactorAuthentication:${userId}`);
        let userData = await redis.get(`user:${userId}`);
        let fromDb = false;
        if (!userData) {
            userData = await User.findOne({userId});
            if (!userData) {
                return reply.send(new ApiError("User not found", 404));
            };
            fromDb = true;
        };
        if (!fromDb) {
            userData = JSON.parse(userData);
        };
        const saveLoginDetail = await Login.create({ userId, deviceFingerPrintHash: twoFactorAuthentication.deviceFingerPrintHash,ipAddress:req.ip });
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
            userId: userId,
            accessToken: securityManager.createAccessToken(accessTokenPayload),
            refreshToken: securityManager.createRefreshToken(refreshTokenPayload),
        },"success", 200));
    } catch (error) {
        console.log("error in the main verify otp login",error.message);
        return reply.send(new ApiError("Internal server error", 500));
    };
};