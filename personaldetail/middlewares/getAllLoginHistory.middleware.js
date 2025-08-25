import {ApiError} from "../err/api.err.js";


export function getAllLoginHistoryMiddleware(req, reply, done) {
    try {
        return done();
    } catch (error) {
        console.log("error in the middleware function of the getAllLoginHistory",error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    };
};
