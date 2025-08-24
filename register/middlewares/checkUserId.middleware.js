import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";

export function checkUserIdMiddleware(req, reply, done) {
    try {
    
        const { mail, deviceFingerPrint } = req.body;
        const sanatizedData = {
            mail: deepSanatize(mail),
            deviceFingerPrint: deepSanatize(deviceFingerPrint),
        };
        if (!sanatizedData.mail || !sanatizedData.deviceFingerPrint) {
            return reply.send(new ApiError("Invalid email", 400));
        }
        req.body = sanatizedData;
        return done();
    } catch (error) {
        console.error("error is comming from the check user id middleware function", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
}