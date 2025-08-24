import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {securityManager} from "../security/securityManager.security.js";
import {redis} from "../config/index.js";
import {User} from "../schema/user.modle.js";


export async function handleUpdateName(req,reply) {
    try {
        const {userId,deviceFingerPrint,deviceFingerPrintHash,newName} = req.body;
        const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint,deviceFingerPrintHash);
        if (!verifyDevice.success) {
            return reply.send(new ApiError("device validation failed",400));
        };
        const user = await User.findOne({userId});
        if (!user) {
            return reply.send(new ApiError("user not found",404));
        };
        user.name = newName;
        await user.save();
        await redis.setWithoutExpiration(`user:${userId}`,JSON.stringify(user.toObject()));
        return reply.send(new ApiResponse(null,"sucess",200));
    } catch (error) {
        console.log("error in the main handle function of the update name function",error.message);
        return reply.send(new ApiError("Internal server error",500));
    };
};