import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";

export function multiFactorAuthenticationMiddleware(req, reply, done) {
    try {
        const { mail, securityKey, deviceFingerPrint } = req.body;
        const sanitizedBody = {
            mail: deepSanatize(mail),
            securityKey: securityKey,
            deviceFingerPrint: deviceFingerPrint,
        };
        if (!sanitizedBody.mail || !sanitizedBody.securityKey || !sanitizedBody.deviceFingerPrint) {
            return reply.send(new ApiError("invalid request", 400));
        };
        req.body = sanitizedBody;
        return done();
    } catch (error) {
        console.log("Error in multi-factor authentication middleware:", error);
        return reply.send(new ApiError("internal server error", 500));
    }
};