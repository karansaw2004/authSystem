import {ApiError} from "../err/api.err.js";

export function getPreSignedUrlToUpdateImageMiddleware(req, reply, done) {
    try {
        return done();
    } catch (error) {
        console.log("error in the middleware function of the getPreSignedUrlToUpdateImage route", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
};
