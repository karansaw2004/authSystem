import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";

export function verifyOtpRegisterMiddleware(req, reply, done) {
    try {
        const {
            mail,
            otp,
            deviceFingerPrint
        } = req.body;
        const sanatizedData = {
            mail: deepSanatize(mail),
            otp: deepSanatize(otp),
            deviceFingerPrint: deviceFingerPrint
        };
        if (!sanatizedData.mail || !sanatizedData.otp || !sanatizedData.deviceFingerPrint) {
            return reply.send(new ApiError("Invalid input", 400));
        };
        req.body = sanatizedData;
        return done();
    } catch (error) {
        return reply.send(new ApiError("Internal Server Error", 500));
    };
};