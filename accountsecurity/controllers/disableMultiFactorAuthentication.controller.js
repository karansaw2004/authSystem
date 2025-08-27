import { ApiError } from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {redis} from "../config/index.js";
import {User} from "../schema/user.modle.js";
import {verifyPassword} from "../services/verifyPassword.service.js";

export async function handleDisableMultiFactorAuthentication(req,reply) {
    try {
        const { userId,securityKey } = req.body;
        const user = await User.findOne({ userId });
        if (!user) {
            return reply.send(new ApiError("User not found", 404));
        };
        const verifyKey = await verifyPassword(securityKey, user.hashedSecurityKey);
        if (!verifyKey.isValid) {
            return reply.send(new ApiError("Invalid security key", 401)).code(401);
        };
        user.multiFactorAuthentication = false;
        user.hashedSecurityKey = null;
        await user.save();
        await redis.setWithoutExpiration(`user:${userId}`, JSON.stringify(user));
        return reply.send(new ApiResponse(null,"Multi-factor authentication disabled successfully",200)).code(200);
    } catch (error) {
        console.log("error in the main handle function of the disable multi factor authentication",error.message);
        return reply.send(new ApiError("Internal Server Error")).code(500);
    }
}