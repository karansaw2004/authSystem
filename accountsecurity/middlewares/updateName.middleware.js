import {ApiError} from "../err/api.err.js";
import {deepSanatize} from "../utils/deepSanatize.util.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";

export function updateNameMiddleware(req, reply, done) {
    try {
        const { name } = req.body;
        const sanitizedData = {
            name: deepSanatize(name),
        };
        if (!sanitizedData.name) {
            return reply.send(new ApiError("name is required", 400));
        };
        req.body.name = sanitizedData.name;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the updateName route", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
};
