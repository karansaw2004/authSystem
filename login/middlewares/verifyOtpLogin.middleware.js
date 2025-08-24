import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";


export function verifyOtpLogin(req, reply, done) {
    try {
        const { mail, otp, deviceFingerPrint } = req.body;
        const sanitizedBody = {
            mail: deepSanatize(mail),
            otp: deepSanatize(otp),
            deviceFingerPrint: deviceFingerPrint,
        };
        if (!sanitizedBody.mail || !sanitizedBody.otp || !sanitizedBody.deviceFingerPrint) {
            return reply.send(new ApiError("invalid request", 400));
        };
        req.body = sanitizedBody;
        return done();
    } catch (error) {
        console.log("Error in verify OTP login middleware:", error);
        return reply.send(new ApiError("internal server error", 500));
    };
};
