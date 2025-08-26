import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {redis} from "../config/index.js";
import {User} from "../schema/user.modle.js";


export async function handleUpdateName(req,reply) {
    try {
        const {userId,newName} = req.body;
        const user = await User.findOneAndUpdate({userId},{$set:{name:newName}},{new:true});
        if (!user) {
            return reply.send(new ApiError("user not found",404));
        };
        await redis.setWithoutExpiration(`user:${userId}`,JSON.stringify(user.toObject()));
        return reply.send(new ApiResponse(null,"sucess",200));
    } catch (error) {
        console.log("error in the main handle function of the update name function",error.message);
        return reply.send(new ApiError("Internal server error",500));
    };
};