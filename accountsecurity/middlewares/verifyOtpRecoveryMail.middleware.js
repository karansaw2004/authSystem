import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";

export function verifyOtpRecoveryMailMiddleware(req, reply, done) {
    try {
        const { otp } = req.body;
        const sanitizedData = {
            otp: deepSanatize(otp),
        };
        if (!sanitizedData.otp) {
            return reply.send(new ApiError("OTP is required", 400));
        }
        req.body.otp = sanitizedData.otp;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the verifyOtpRecoveryMail route", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
};