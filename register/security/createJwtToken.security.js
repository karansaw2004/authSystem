import jwt from "jsonwebtoken";

export function createJwtToken(payload, secret, options) {
    return jwt.sign(payload, secret, options);
}
