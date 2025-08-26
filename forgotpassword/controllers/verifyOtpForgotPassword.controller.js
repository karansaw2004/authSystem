import {redis} from "../config/index.js";
import {ApiError} from "../err/api.err.js";
import {securityManager} from "../security/securityManager.security.js";
import {User} from "../schema/user.modle.js";
import {Login} from "../schema/login.modle.js";
import {hashPassword} from "../services/hashPassword.service.js";

export async function handleVerifyOtpForgotPassword(req, reply) {
    try {
        const { mail, otp, deviceFingerPrint,password } = req.body;
        const userId = securityManager.createUserId(mail);
        const data = await redis.get(`forgotpassword:${userId}`);
        if (!data) {
            return reply.send(new ApiError("Invalid request", 400));
        }
        data = JSON.parse(data);
        if (data.otp !== otp) {
            return reply.send(new ApiError("Invalid OTP", 400));
        };
        const deviceFingerPrintHash = securityManager.createDeviceFingerPrintHash(deviceFingerPrint);
        const hashedNewPassword = await hashPassword(password);
        const updateUser = await User.findByIdAndUpdate({userId}, {$set:{hashedPassword:hashedNewPassword}},{new:true});
        if(!updateUser){
            return reply.send(new ApiError("User not found", 404));
        };
        const saveLoginDetail = await Login.create({
            userId: userId,
            deviceFingerPrintHash: deviceFingerPrintHash
        });
        if (!saveLoginDetail) {
            console.log("error in saving login detail");
            return reply.send(new ApiError("Internal Server error",500));
        };
        const accessTokenPayload = {
            userId: userId,
            deviceFingerPrintHash: deviceFingerPrintHash
        };
        const refreshTokenPayload = {
            userId: userId,
            deviceFingerPrintHash: deviceFingerPrintHash,
            name: updateUser.name,
            email: updateUser.mail,
            profileImageUrl: updateUser.profileImageUrl,
        };
        return reply.send(new ApiResponse({ accessToken: accessTokenPayload, refreshToken: refreshTokenPayload, userId }, "success", 200));
    } catch (error) {
        console.log("error in the main function of verifyOtpForgotPassword", error.message);
        return reply.send(new ApiError("Internal server error", 500));
    };
};