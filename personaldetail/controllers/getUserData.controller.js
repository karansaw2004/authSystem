import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {securityManager} from "../security/securityManager.security.js";
import {redis} from "../config/index.js";
import {User} from "../schema/user.modle.js";


export async function handleGetAllUserData(req,reply) {
    try {
        const {userId,deviceFingerPrint,deviceFingerPrintHash} = req.body;
        const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint,deviceFingerPrintHash);
        if (!verifyDevice.success) {
            return reply.send(new ApiError("device is invalid",402));
        };
        let user = await redis.get(`user:${userId}`);
        if(!user){
            user = await User.findOne({userId});
            if(!user){
                return reply.send(new ApiError("user not found",404));
            };
        };
        await redis.set(`user:${userId}`,user);
        return reply.send(new ApiResponse({name:user.name,email:user.email},"user data fetched successfully",200));
    } catch (error) {
        console.log("error in the main handle function of the get all login detail",error.message);
        return reply.send(new ApiError("Internal server error",500));
    }
}