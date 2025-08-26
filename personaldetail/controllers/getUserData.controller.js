import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";

import {redis} from "../config/index.js";
import {User} from "../schema/user.modle.js";


export async function handleGetAllUserData(req,reply) {
    try {
        const {userId} = req.body;
        let user = await redis.get(`user:${userId}`);
        let fromDb = false;
        if(!user){
            user = await User.findOne({userId});
            if(!user){
                return reply.send(new ApiError("user not found",404));
            };
            fromDb = true;
        };
        if (!fromDb) {
            user = JSON.parse(user);
        };
        if (fromDb) {
            await redis.setWithoutExpiration(`user:${userId}`,JSON.stringify(user));
        };
        user.hashedPassword = undefined;
        user.hashedSecurityKey = undefined;
        return reply.send(new ApiResponse(user,"user data fetched successfully",200));
    } catch (error) {
        console.log("error in the main handle function of the get all login detail",error.message);
        return reply.send(new ApiError("Internal server error",500));
    };
};