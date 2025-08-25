import {securityManager} from "../security/securityManager.security.js";

export const services = {
    verifyAccessToken: async (call,callback) => {
        try {
            const accessToken = call?.request?.accessToken;
            const deviceFingerPrint = call?.request?.deviceFingerprint;
            const verifyToken = securityManager.verifyAccessToken(accessToken, deviceFingerPrint);
            if (!verifyDevice.success) {
                return callback(null, { success: false, userId: "" });
            };
            const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint,verifyToken.payload.deviceFingerPrintHash);
            if (!verifyDevice.success) {
                return callback(null, { success: false, userId: "" });  
            };
            return callback(null, { success: true, userId: verifyToken.payload.userId || "" });
        } catch (error) {
            console.error("Error in verifyAccessToken:", error.message);
            return callback(
                {
                    code: 30,
                    message: error.message || "Internal server error",
                }
            )
        }
    },
    verifyRefreshToken: async (call,callback) => {
        try {
            const refreshToken = call?.request?.refreshToken;
            const deviceFingerPrint = call?.request?.deviceFingerprint;
            const verifyToken = securityManager.verifyRefreshToken(refreshToken, deviceFingerPrint);
            if (!verifyToken.success) {
                return callback(null, { success: false, accessToken: "", refreshToken: "" });
            };
            const accessTokenPayload = {
                userId: verifyToken.payload.userId ,
                deviceFingerPrintHash: verifyToken.payload.deviceFingerPrintHash,
            };
            const newAccessToken = securityManager.createAccessToken(accessTokenPayload,"1d");
            let newRefreshtoken  = refreshToken;
            if (verifyToken.reHash) {
                newRefreshtoken = securityManager.createRefreshToken(verifyToken.payload,"7d");
            }
            return callback(null, { success: true, accessToken: newAccessToken, refreshToken: newRefreshtoken });
        } catch (error) {
            console.error("Error in verifyRefreshToken:", error.message);
            return callback(
                {
                    code: 30,
                    message: error.message || "Internal server error",
                }
            )
        }
    },
    getUserData: async (call,callback) => {
        try {
            const refreshToken = call?.request?.refreshToken;
            const deviceFingerPrint = call?.request?.deviceFingerprint;
            const verifyToken = securityManager.decodeRefreshToken(refreshToken);
            if (!verifyToken.success) {
                return callback(null, { success: false, userId: "", email: "", name: "", profileImageUrl: "" });
            }
            const verifyDevice = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint,verifyToken.payload.deviceFingerPrintHash);
            if (!verifyDevice.success) {
                return callback(null, { success: false, userId: "", email: "", name: "", profileImageUrl: "" });
            };
            return callback(null, { success: true, userId: verifyToken.payload.userId || "", email: verifyToken.payload.email || "", name: verifyToken.payload.name || "", profileImageUrl: verifyToken.payload.profileImageUrl || "" });
        } catch (error) {
            console.error("Error in getUserData:", error.message);
            return callback(
                {
                    code: 30,
                    message: error.message || "Internal server error",
                }
            )
        }
    }
};