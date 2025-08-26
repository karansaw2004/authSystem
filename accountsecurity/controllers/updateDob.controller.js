import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {User} from "../schema/user.modle.js";
import {redis} from "../config/index.js";


export async function handleUpdateDob(req, reply) {
    try {
        const { userId, newDob } = req.body;
        const user = await User.findOneAndUpdate({ userId },{$set:{dob:newDob}},{new:true});
        if (!user) {
            return reply.send(new ApiError("User not found", 404));
        };
        await redis.setWithoutExpiration(`user:${userId}`, JSON.stringify(user));
        return reply.send(new ApiResponse("Date of birth updated successfully", 200));
    } catch (error) {
        console.log("error in the main handle function of the update date of birth", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    };
};