import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {securityManager} from "../security/securityManager.security.js";
import {User} from "../schema/user.modle.js";
import {redis} from "../config/index.js";


export async function handleDeleteRecoveryMail(req, reply) {
    try {
        const { userId, deviceFingerPrint, deviceFingerPrintHash } = req.body;
        const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint, deviceFingerPrintHash);
        if (!verifyDevice.success) {
            return reply.send(new ApiError("Device verification failed", 401));
        };
        const user = await User.findOneAndUpdate({ userId }, {$set:{recoveryMail: null}}, { new: true });
        if (!user) {
            return reply.send(new ApiError("User not found", 404));
        };
        await redis.setWithoutExpiration(`user:${userId}`, JSON.stringify(user));
        return reply.send(new ApiResponse("Recovery mail deleted successfully", 200));
    } catch (error) {
        console.log("error in the main handle function of the delete recovery mail route", error.message);
        return reply.send(new ApiError("Internal server error", 500));
    };
};
