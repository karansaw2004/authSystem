import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";

export function registerMiddleware(req, reply, done) {
    try {
        const {
            mail,
            password,
            deviceFingerPrint,
            name,
        } = req.body;
        const sanatizedData = {
            mail: deepSanatize(mail),
            password: deepSanatize(password),
            deviceFingerPrint: deepSanatize(deviceFingerPrint),
            name: deepSanatize(name),
        };
        if (!sanatizedData.mail || !sanatizedData.password || !sanatizedData.deviceFingerPrint || !sanatizedData.name) {
            return reply.send(new ApiError("Invalid input", 400));
        };
        req.body = sanatizedData;
        return done();
    } catch (error) {
        return reply.send(new ApiError("Internal Server Error", 500));
    };
};
