import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {securityManager} from "../security/securityManager.security.js";
import {hashPassword} from "../services/hashPassword.service.js";
import {User} from "../schema/user.modle.js";
import { redis } from "../config/index.js";


export async function handleUpdatePassword(params) {
    try {
        const { userId,newPassword } = params;
        const hashedPassword = await hashPassword(newPassword);
        const user = await User.findByIdAndUpdate(userId, {$set: { password: hashedPassword }},{new:true});
        if (!user) {
            return reply.send(new ApiError("User not found", 404));
        };
        await redis.setWithoutExpiration(`user:${userId}`, JSON.stringify(user.toObject()));
        return reply.send(new ApiResponse("Password updated successfully"));
    } catch (error) {
        console.log("error in the main handle function of the update password", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    };
};