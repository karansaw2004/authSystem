import { ApiError } from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {redis} from "../config/index.js";
import {User} from "../schema/user.modle.js";
import {hashPassword} from "../services/hashPassword.service.js";

export async function handleEnableMultiFactorAuthentication(req,reply) {
    try {
        const { userId,securityKey } = req.body;
        const user = await User.findOne({ userId });
        if (!user) {
            return reply.send(new ApiError("User not found", 404));
        };
        const hashKey = await hashPassword(securityKey);
        user.hashedSecurityKey = hashKey.hashedPassword;
        user.multiFactorAuthentication = true;
        await user.save();
        await redis.setWithoutExpiration(`user:${userId}`, JSON.stringify(user));
        return reply.send(new ApiResponse("Multi-factor authentication enable successfully", 200));
    } catch (error) {
        console.log("error in the main handle function of the enable multi factor authentication",error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
}