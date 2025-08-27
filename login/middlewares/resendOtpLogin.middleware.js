import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";


export function resendOtpLoginMiddleware(req,reply,done) {
    try {
        const {mail,deviceFingerPrint} = req.body;
        const sanitizedData = {
            mail: deepSanatize(mail),
            deviceFingerPrint: deviceFingerPrint,
        };
        if (!sanitizedData.mail || !sanitizedData.deviceFingerPrint) {
            return reply.send(new ApiError(""))
        };
        return done();
    } catch (error) {
        console.log("error in the middleware function of the resendOtp login",error.message);
        return reply.send(new ApiError("Internal server error",500));
    };
};