import {securityManager} from "../security/securityManager.security.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {ApiError} from "../err/api.err.js";
import {redis} from "../config/index.js";
import {generateOtp} from "../helpers/generateOtp.helper.js";
import {SendOtp} from "../utils/sendOtp.util.js";
import {maskEmail} from "../helpers/maskMail.helper.js";

export async function handleResendOtpForgotPassword(req,reply) {
    try {
        const {mail,deviceFingerPrint} = req.body;
        const userId = securityManager.createUserId(mail);
        let data = await redis.get(`forgotpassword:${userId}`);
        if (!data) {
            return reply.send(new ApiError("No pending registration found for this email",404));
        };
        data = JSON.parse(data);
        const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint,data.deviceFingerPrintHash);
        if (!verifyDevice.success) {
            return reply.send(new ApiError("Device not recognized. Please use the device used during forgotpassword",403));
        };
        const newOtp = generateOtp().toString();
        data.otp = newOtp;
        const sendMail = await SendOtp(mail,"forgotpassword",newOtp);
        if (!sendMail) {
            return reply.send(new ApiError("Failed to send OTP. Please try again later",500));  
        };
        await redis.set(`forgotpassword:${userId}`,JSON.stringify(data),300);
        return reply.send(new ApiResponse({mail:maskEmail(mail)},"OTP resent successfully"));
    } catch (error) {
        console.log("error in the controller function of the resendOtp forgotpassword",error.message);
        return reply.send(new ApiError("Internal server error",500));
    };
};