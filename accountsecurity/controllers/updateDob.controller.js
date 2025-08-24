import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {securityManager} from "../security/securityManager.security.js";
import {User} from "../schema/user.modle.js";
import {redis} from "../config/redis.config.js";


export async function handleUpdateDob(req, reply) {
    try {
        const { userId, newDob, deviceFingerPrint, deviceFingerPrintHash } = req.body;
        const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint, deviceFingerPrintHash);
        if (!verifyDevice.success) {
            return reply.send(new ApiError("Device verification failed", 401));
        };
        const user = await User.findOne({ userId });
        if (!user) {
            return reply.send(new ApiError("User not found", 404));
        };
        user.dob = newDob;
        await user.save();
        await redis.setWithoutExpiration(`user:${userId}`, JSON.stringify(user));
        return reply.send(new ApiResponse("Date of birth updated successfully", 200));
    } catch (error) {
        console.log("error in the main handle function of the update date of birth", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    };
};