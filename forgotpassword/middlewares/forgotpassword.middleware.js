import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";

export function forgotPasswordMiddleware(req, reply, done) {
    try {
        const { mail, deviceFingerPrint } = req.body;
        const sannatizedData = {
            mail: deepSanatize(mail),
            deviceFingerPrint: deviceFingerPrint,
        };
        if (!sannatizedData.mail || !sannatizedData.deviceFingerPrint) {
            return reply.send(new ApiError("Mail and Device Finger Print are required", 400)); 
        };
        req.body = sannatizedData;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the forgotPassword route",error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
}