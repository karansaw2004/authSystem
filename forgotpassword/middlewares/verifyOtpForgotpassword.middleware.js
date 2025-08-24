import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";

export function verifyOtpForgotPasswordMiddleware(req, reply, done) {
    try {
        const {mail,otp,deviceFingerPrint} = req.body;
        const sanitizedData = {
            mail: deepSanatize(mail),
            otp: deepSanatize(otp),
            deviceFingerPrint: deviceFingerPrint,
        };
        if (!sanitizedData.mail || !sanitizedData.otp || !sanitizedData.deviceFingerPrint) {
            return reply.send(new ApiError("Mail, OTP and Device Finger Print are required", 400));
        };
        req.body = sanitizedData;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the forgotPassword route",error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
}
