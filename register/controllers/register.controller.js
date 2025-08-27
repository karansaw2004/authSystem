import {securityManager} from "../security/securityManager.security.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {ApiError} from "../err/api.err.js"; 
import {redis} from "../config/index.js";
import {SendOtp} from "../utils/sendOtp.util.js";
import {generateOtp} from "../helpers/generateOtp.helper.js";
import {hashPassword} from "../services/hashPassword.service.js";
import {maskEmail} from "../helpers/maskMail.helper.js";

export async function handleRegister(req, reply) {
    try {
        const { mail, deviceFingerPrint,password,name,dob} = req.body;
        const userId = securityManager.createUserId(mail);
        let data = await redis.get(`reserve:${userId}`);
        if (!data) {
            return reply.send(new ApiError("No reservation found for this user", 400));
        };
        data = JSON.parse(data);
        const verify = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint,data.deviceFingerPrintHash);
        if (verify.success === false) {
            return reply.send(new ApiError("Device fingerprint verification failed", 401));
        };
        const {hashedPassword} = await hashPassword(password);
        const otp = generateOtp().toString();
        const subject = "Your OTP Code for register is";
        const isOtpSent = await SendOtp(mail, subject, otp);
        data.otp = otp;
        data.name = name;
        data.dob = String(dob);
        data.hashedPassword = hashedPassword;
        await redis.set(`reserve:${userId}`, JSON.stringify(data), 300);
        if (!isOtpSent) {
            return reply.send(new ApiError("Failed to send OTP", 500));
        };
        return reply.send(new ApiResponse({ otpSent:true,mail:maskEmail(mail) }, "success", 200));
    } catch (error) {
        console.log("error in the main handle function of the register", error);
        return reply.send(new ApiError("Internal Server Error", 500));
    };
};
