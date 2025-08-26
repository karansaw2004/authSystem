import {ApiError} from "../err/api.err.js";

export function updatePasswordMiddleware(req, reply, done) {
    try {
        const { password } = req.body;
        const sanitizedData = {
            password: password,

        };
        if (!sanitizedData.password) {
            return reply.send(new ApiError("Password is required", 400));
        }
        req.body.password = sanitizedData.password;
        return done();
    } catch (error) {
        console.log("error in the middleware function of the updatePassword route", error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
};