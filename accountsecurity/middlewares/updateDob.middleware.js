import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";

export function updateDobMiddleware(req, reply, done) {
    try {
        const { dob } = req.body;
        const sanitizedData = {
            dob: deepSanatize(dob),
        };
        if (!sanitizedData.dob ) {
            return reply.send(new ApiError("Date of Birt", 400));
        }
        req.body.dob = sanitizedData.dob;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the updateDob route", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
};
