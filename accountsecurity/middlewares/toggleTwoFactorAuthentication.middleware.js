import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";

export function toggleTwoFactorAuthenticationMiddleware(req, reply, done) {
    try {
        const { deviceFingerPrint } = req.body;
        const data = verifyAccessToken(req);
        if (!data) {
            return reply.send(new ApiError("Invalid or expired token", 401));
        };
        const userId = data.payload.userId;
        const deviceFingerPrintHash = data.payload.deviceFingerPrintHash;
        const sanitizedData = {
            deviceFingerPrint: deviceFingerPrint,
            userId: userId,
            deviceFingerPrintHash: deviceFingerPrintHash,
        };
        if (!sanitizedData.deviceFingerPrint) {
            return reply.send(new ApiError("Device Finger Print are required", 400));
        }
        req.body = sanitizedData;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the enableTwoFactorAuthentication route", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
};
