import jwt from "jsonwebtoken";

export function verifyJwtToken(token, secret) {
    try {
        const decoded = jwt.verify(token, secret);
        return { valid: true, expired: false, decoded };
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return { valid: false, expired: true, decoded: null };
        }
        return { valid: false, expired: false, decoded: null };
    }
}
