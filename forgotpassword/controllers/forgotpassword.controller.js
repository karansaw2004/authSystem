import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {securityManager} from "../security/securityManager.security.js";
import {hashPassword} from "../services/hashPassword.service.js";
import {redis} from "../config/index.js";
import {User} from "../schema/user.modle.js";


export async function handleForgotPassword(req,reply) {
    try {
        const { mail, deviceFingerPrint } = req.body;
        let userId = securityManager.createUserId(mail);
        let user = await redis.get(`user:${userId}`);
        if (!user) {
            user = await User.findOne(userId);
            if (!user) {
                return reply.send(new ApiError("User not found", 404));
            }
        }
        const otp = securityManager.generateOtp().toString();
        await redis.set(`forgot-password:${user.id}`, otp, "EX", 300);
        await securityManager.sendOtpToUser(user, otp);
        return reply.send(new ApiResponse("OTP sent successfully"));
    } catch (error) {
        console.log("error in the main handle function of the handle forgot password", error);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
}