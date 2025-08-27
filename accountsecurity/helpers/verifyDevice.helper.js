import {securityManager} from "../security/securityManager.security.js";
import {ApiError} from "../err/api.err.js";

export function verifyDevice(req,reply,done){
    try {
        const {deviceFingerPrint,deviceFingerPrintHash} = req.body;
        const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint,deviceFingerPrintHash);
        console.log("verifyDevice",verifyDevice);
        if (!verifyDevice.success) {
            return reply.send(new ApiError("Device verification failed", 400));
        };
        return done();
    } catch (error) {
        console.log("error in verifing device",error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    };
};