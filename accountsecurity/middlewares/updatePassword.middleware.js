import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";

export function updatePasswordMiddleware(req, reply, done) {
    try {
        const { password, deviceFingerPrint } = req.body;
        const data = verifyAccessToken(req.headers.authorization);
        if (!data) {
            return reply.send(new ApiError("Invalid or expired token", 401));
        };
        const userId = data.payload.userId;
        const deviceFingerPrintHash = data.payload.deviceFingerPrintHash;
        const sanitizedData = {
            password: password,
            deviceFingerPrint: deviceFingerPrint,
            userId: userId,
            deviceFingerPrintHash: deviceFingerPrintHash,
        };
        if (!sanitizedData.password || !sanitizedData.deviceFingerPrint) {
            return reply.send(new ApiError("Password and Device Finger Print are required", 400));
        }
        req.body = sanitizedData;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the updatePassword route", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
};
