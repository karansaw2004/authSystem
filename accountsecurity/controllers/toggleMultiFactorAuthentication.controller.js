import { ApiError } from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {redis} from "../config/index.js";
import {User} from "../schema/user.modle.js";
import {securityManager} from "../security/securityManager.security.js";


export async function handleToggleMultiFactorAuthentication(req,reply) {
    try {
        const { userId, deviceFingerPrint, deviceFingerPrintHash } = req.body;
        const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint, deviceFingerPrintHash);
        if (!verifyDevice.success) {
            return reply.send(new ApiError("Device verification failed", 401));
        };
        const user = await User.findOne({ userId });
        if (!user) {
            return reply.send(new ApiError("User not found", 404));
        };
        user.isMultiFactorEnabled = !user.isMultiFactorEnabled;
        await user.save();
        await redis.setWithoutExpiration(`user:${userId}`, JSON.stringify(user));
        return reply.send(new ApiResponse("Multi-factor authentication toggled successfully", 200));
    } catch (error) {
        console.log("error in the main handle function of the toggle multi factor authentication",error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
}