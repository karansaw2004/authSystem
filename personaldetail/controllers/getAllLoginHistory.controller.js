import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {Login} from "../schema/login.modle.js";


export async function handleGetAllLoginHistory(req,reply) {
    try {
        const {userId} = req.body;
        const loginDetail = await Login.find({userId});
        return reply.send(new ApiResponse(loginDetail,"sucess",200));
    } catch (error) {
        console.log("error in the main handle function of the get all login detail",error.message);
        return reply.send(new ApiError("Internal server error",500));
    }
}