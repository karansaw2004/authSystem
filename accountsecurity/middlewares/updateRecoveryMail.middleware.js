import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";

export function updateRecoveryMailMiddleware(req, reply, done) {
    try {
        const {recoveryMail} = req.body;
        const sanitizedData = {
            recoveryMail: deepSanatize(recoveryMail),
        };
        if (!sanitizedData.recoveryMail) {
            return reply.send(new ApiError("Recovery Mail is required", 400));
        }
        req.body.recoveryMail = sanitizedData.recoveryMail;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the updateRecoveryMail route", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
};
