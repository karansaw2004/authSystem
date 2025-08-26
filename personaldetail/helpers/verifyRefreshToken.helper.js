import {securityManager} from "../security/securityManager.security.js";
import {extractToken} from "../utils/extractBearerToken.util.js";
import {ApiError} from "../err/api.err.js";


export function verifyRefreshToken(req,reply,done) {
    try {
        const token = extractToken(req);
        if (!token) {
            return reply.send(new ApiError("Refresh token is missing",401));
        }
        const result = securityManager.verifyRefreshToken(token);
        if (!result.success) {
            return reply.send(new ApiError("Invalid refresh token",403));
        };
        req.body.userId = result.payload.userId;
        req.body.reHash = result.payload.reHash;
        req.body.deviceFingerPrintHash = result.payload.deviceFingerPrintHash;
        req.body.payload = result.payload;
        return done();
    } catch (error) {
        console.log("error in the verify refresh token middleware:", error.message);
        return reply.send(new ApiError("Internal server error",500));
    }
};