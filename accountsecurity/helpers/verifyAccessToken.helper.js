import {securityManager} from "../security/securityManager.security.js";
import {extractToken} from "../utils/extractBearerToken.util.js";
import {ApiError} from "../err/api.err.js";


export function verifyAccessToken(req,reply,done) {
    try {
        const token = extractToken(req);
        if (!token) {
            return reply.send(new ApiError("Access token is missing",401));
        }
        const result = securityManager.verifyAccessToken(token);
        if (!result.success) {
            return reply.send(new ApiError("Invalid access token",403));
        };
        req.body.userId = result.payload.userId;
        req.body.reHash = result.reHash;
        req.body.deviceFingerPrintHash = result.payload.deviceFingerPrintHash;
        return done();
    } catch (error) {
        console.log("error in the verify access token middleware:", error.message);
        return reply.send(new ApiError("Internal server error",500));
    }
};