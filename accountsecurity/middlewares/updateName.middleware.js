import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";

export function updateNameMiddleware(req, reply, done) {
    try {
        const { newName } = req.body;
        const sanitizedData = {
            newName: deepSanatize(newName),
        };
        if (!sanitizedData.newName) {
            return reply.send(new ApiError("newName is required", 400));
        };
        req.body.newName = sanitizedData.newName;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the updateName route", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
};
