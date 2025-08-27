import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import { redis } from "../config/index.js";
import {User} from "../schema/user.modle.js";

export async function handleVerifyOtpRecoveryMail(req, reply) {
    try {
        const { userId, otp} = req.body;
        const data = await redis.get(`updateRecovery:${userId}`);
        if (!data) {
            return reply.send(new ApiError("Invalid or expired OTP", 400));
        }
        const { otp: storedOtp, recoveryMail } = JSON.parse(data);
        if (otp !== storedOtp) {
            return reply.send(new ApiError("Invalid OTP", 400));
        };
        const user = await User.findOneAndUpdate({ userId }, { $set: { recoveryMail: recoveryMail } }, { new: true });
        if (!user) {
            return reply.send(new ApiError("User not found", 404));
        };
        await redis.del(`updateRecovery:${userId}`);
        await redis.setWithoutExpiration(`user:${userId}`, JSON.stringify(user.toObject()));
        return reply.send(new ApiResponse("Recovery email verified and updated successfully", 200));
    } catch (error) {
        console.log("error in the main handle function of the verify otp", error.message);
        return reply.send(new ApiError("Internal server error", 500));
    };
};