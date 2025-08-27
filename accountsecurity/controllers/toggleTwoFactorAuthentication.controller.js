import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {User} from "../schema/user.modle.js";
import {redis} from "../config/index.js";


export async function handleToggleTwoFactorAuthentication(req, reply) {
    try {
        const { userId } = req.body;
        const user = await User.findOne({ userId });
        if (!user) {
            return reply.send(new ApiError("User not found", 404));
        };
        user.twoFactorAuthentication = !user.twoFactorAuthentication;
        await user.save();
        await redis.setWithoutExpiration(`user:${userId}`, JSON.stringify(user.toObject()));
        const response = new ApiResponse(
            { twoFactorAuthentication: user.twoFactorAuthentication },
            "Two-factor authentication toggled successfully",
            200
        );
        return reply.status(response.statusCode).send(response);
    } catch (error) {
        console.log("error in the main handle function of the toggle two factor authentication", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    };
};