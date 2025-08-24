import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {securityManager} from "../security/securityManager.security.js";
import { redis } from "../config/index.js";
import {User} from "../schema/user.modle.js";

export async function handleVerifyOtpRecoveryMail(req, reply) {
    try {
        const { userId, otp, deviceFingerPrint, deviceFingerPrintHash } = req.body;
        const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint, deviceFingerPrintHash);
        if (!verifyDevice) {
            return reply.send(new ApiError("Invalid device", 401));
        };
        const data = await redis.get(`updateRecovery:${userId}`);
        if (!data) {
            return reply.send(new ApiError("Invalid or expired OTP", 400));
        }
        const { otp: storedOtp, newRecoveryMail } = JSON.parse(data);
        if (otp !== storedOtp) {
            return reply.send(new ApiError("Invalid OTP", 400));
        };
        const user = await User.findOneAndUpdate({ _id: userId }, { $set: { recoveryMail: newRecoveryMail } }, { new: true });
        if (!user) {
            return reply.send(new ApiError("User not found", 404));
        };
        await redis.del(`updateRecovery:${userId}`);
        await redis.setWithoutExpiration(`user:${userId}`, JSON.stringify(user));
        return reply.send(new ApiResponse("Recovery email verified and updated successfully", 200));
    } catch (error) {
        console.log("error in the main handle function of the verify otp", error.message);
        return reply.send(new ApiError("Internal server error", 500));
    }
}