import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";

export function updateRecoveryMailMiddleware(req, reply, done) {
    try {
        const {recoveryMail, deviceFingerPrint } = req.body;
        const data = verifyAccessToken(req.headers.authorization);
        if (!data) {
            return reply.send(new ApiError("Invalid or expired token", 401));
        };
        const userId = data.payload.userId;
        const deviceFingerPrintHash = data.payload.deviceFingerPrintHash;
        const sanitizedData = {
            recoveryMail: deepSanatize(recoveryMail),
            deviceFingerPrint: deviceFingerPrint,
            userId: userId,
            deviceFingerPrintHash: deviceFingerPrintHash,
        };
        if (!sanitizedData.recoveryMail || !sanitizedData.deviceFingerPrint) {
            return reply.send(new ApiError("Recovery Mail and Device Finger Print are required", 400));
        }
        req.body = sanitizedData;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the updateRecoveryMail route", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
};
