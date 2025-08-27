import {ApiResponse} from "../res/apiResponse.res.js";
import {ApiError} from "../err/api.err.js";
import {redis} from "../config/index.js";
import {generateOtp} from "../helpers/generateOtp.helper.js";
import {SendOtp} from "../utils/sendOtp.util.js";
import {maskEmail} from "../helpers/maskMail.helper.js";

export async function handleResendOtpRecoveryMail(req,reply) {
    try {
        const {userId} = req.body;
        let data = await redis.get(`updateRecovery:${userId}`);
        if (!data) {
            return reply.send(new ApiError("data not found",404));
        };
        data = JSON.parse(data);
        const newOtp = generateOtp().toString();
        data.otp = newOtp;
        const sendMail = await SendOtp(mail,"recover mail",newOtp);
        if (!sendMail) {
            return reply.send(new ApiError("Failed to send OTP. Please try again later",500));  
        };
        await redis.set(`updateRecovery:${userId}`,JSON.stringify(data),300);
        return reply.send(new ApiResponse({mail:maskEmail(mail)},"OTP resent successfully"));
    } catch (error) {
        console.log("error in the controller function of the resendOtpRegister",error.message);
        return reply.send(new ApiError("Internal server error",500));
    };
};