import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {Login} from "../schema/login.modle.js";


export async function handleLogOut(req,reply) {
    try {
        const {userId,deviceFingerPrintHash} = req.body;
        const loginDetail = await Login.findOneAndUpdate({userId,deviceFingerPrintHash},{$set:{currentStatus:"deActive"}},{new:true});
        if (!loginDetail) {
            return reply.send(new ApiError("Logout failed",400));
        }
        return reply.send(new ApiResponse({logout:true},"sucess",200));
    } catch (error) {
        console.log("error in the main handle function of the logout",error.message);
        return reply.send(new ApiError("Internal server error",500));
    }
};