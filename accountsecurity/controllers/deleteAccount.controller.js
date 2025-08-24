import { ApiError } from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {redis} from "../config/index.js";
import {securityManager} from "../security/securityManager.security.js";
import {User} from "../schema/user.modle.js";

export async function handleDeleteAccount(req,reply) {
    try {
        const { userId,deviceFingerPrint,deviceFingerPrintHash } = req.body;
        const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint, deviceFingerPrintHash);
        if (!verifyDevice.success) {
            return reply.send(new ApiError("Device verification failed", 401));
        };
        
    } catch (error) {
        console.log("error in the main handle function of the delete account route", error.message);
        return reply.send(new ApiError("Internal server error", 500));
    }
}