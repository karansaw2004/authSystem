import {securityManager} from "../security/securityManager.security.js";
import {extractToken} from "../utils/extractBearerToken.util.js";

export function verifyRefreshToken(req) {
    const token = extractToken(req);
    if (!token) {
        return false;
    }
    const result = securityManager.verifyRefreshToken(token);
    if (!result.success) {
        return false;
    };
    return {
        payload: result.payload,
        reHash: result.reHash,
    };
};