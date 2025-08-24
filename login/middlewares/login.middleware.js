import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";
export function loginMiddleware(req, reply, done) {
    try {
        const { mail, password, deviceFingerPrint } = req.body;
        const sanitizedBody = {
            mail: deepSanatize(mail),
            password: deepSanatize(password),
            deviceFingerPrint: deviceFingerPrint,
        };
        if (!sanitizedBody.mail || !sanitizedBody.password || !sanitizedBody.deviceFingerPrint) {
            return reply.send(new ApiError("invalid request", 400));
        };
        req.body = sanitizedBody;
        return done();
    } catch (error) {
        console.log("Error in login middleware:", error);
        return reply.send(new ApiError("internal server error", 500));
    }
}