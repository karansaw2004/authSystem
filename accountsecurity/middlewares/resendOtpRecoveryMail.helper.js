import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";


export function resendOtpRecoverMailMiddleware(req,reply,done) {
    try {
        const {deviceFingerPrint} = req.body;
        const sanitizedData = {
            deviceFingerPrint: deviceFingerPrint,
        };
        if (!sanitizedData.deviceFingerPrint) {
            return reply.send(new ApiError("data missing",400));
        };
        return done();
    } catch (error) {
        console.log("error in the middleware function of the resendOtp recover email",error.message);
        return reply.send(new ApiError("Internal server error",500));
    };
};