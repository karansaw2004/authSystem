import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {securityManager} from "../security/securityManager.security.js";
import {generateOtp} from "../helpers/generateOtp.helper.js";
import {redis} from "../config/index.js";
import {User} from "../schema/user.modle.js";
import {SendOtp} from "../utils/sendOtp.util.js";
import {maskEmail} from "../helpers/maskMail.helper.js";


export async function handleForgotPassword(req,reply) {
    try {
        const { mail, deviceFingerPrint } = req.body;
        let userId = securityManager.createUserId(mail);
        let user = await redis.get(`user:${userId}`);
        let fromDb = false;
        if (!user) {
            user = await User.findOne(userId);
            if (!user) {
                return reply.send(new ApiError("User not found", 404));
            };
            fromDb = true;
        };
        if(!fromDb){
            user = JSON.parse(user);
        }
        const otp = generateOtp().toString();
        const sendOtpResponse = await SendOtp(mail, otp);
        if (!sendOtpResponse) {
            console.log("error in sending OTP");
            return reply.send(new ApiError("Internal Server Error", 500));
        };
        const deviceFingerPrintHash = securityManager.createDeviceFingerPrintHash(deviceFingerPrint);
        await redis.set(`forgotpassword:${userId}`, { otp, deviceFingerPrintHash }, 300);
        return reply.send(new ApiResponse({mail:maskEmail(mail),otpSent:true},"success", 200));
    } catch (error) {
        console.log("error in the main handle function of the handle forgot password", error);
        return reply.send(new ApiError("Internal Server Error", 500));
    };
};