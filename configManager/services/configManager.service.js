export const services = {
    hmacKey: async (call,callback) => {
        try {
            const hmacKey = "6efb918fd5c0eb4d6ab5b227f20f57a5";
            const data = {hmacKey};
            return callback(null,data);
        } catch (error) {
            console.log("error in the fetching the hmac key",error.message);
            return callback(
                {
                    code:500,
                    message:error.message,
                },
            );
        }
    },
    databaseUrl: async (call,callback) => {
        try {
            const connectionUrl = "mongodb+srv://karan:V9oiH8TyDxmNZcJZ@karan.musoyqw.mongodb.net/";
            const data = {connectionUrl};
            return callback(null,data);
        } catch (error) {
            console.log("error in the fetching the databaseUrl key",error.message);
            return callback(
                {
                    code:500,
                    message:error.message,
                },
            );
        }
    },
    cloudConfig: async (call,callback) => {
        try {
            const accessKeyId = "fef";
            const secretAccesskey = "dev";
            const bucketName = "swdf";
            const region = "sce";
            const data = {
                accessKeyId,
                secretAccesskey,
                bucketName,
                region
            };
            return callback(null,data);
        } catch (error) {
            console.log("error in the fetching the cloud config",error.message);
            return callback(
                {
                    code:500,
                    message:error.message,
                },
            );
        }
    },
    redisConfig: async (call,callback) => {
        try {
            const host = "localhost";
            const port = 6379;
            const dbUsername = "";
            const dbPassword = "";
            const data = { host, port, dbUsername, dbPassword };
            return callback(null,data);
        } catch (error) {
            console.log("error in the fetching the redis config",error.message);
            return callback(
                {
                    code:500,
                    message:error.message,
                },
            );
        }
    },
    redpandaConfig: async (call,callback) => {
        try {
            const brokers = ["localhost:19092"];
            const clientId = "ew"
            const data = { brokers,clientId};
            return callback(null,data);
        } catch (error) {
            console.log("error in the fetching the redpanda config",error.message);
            return callback(
                {
                    code:500,
                    message:error.message,
                },
            );
        }
    },
    validKeys: async (call,callback) => {
        try {
            const oldAccessTokenKeyVersion = "v1";
            const oldRefreshTokenKeyVersion = "v1";
            const oldDeviceFingerPrintKeyVersion = "v1";
            const oldAccessTokenKey = "6efb918fd5c0eb4d6ab5b227f20f57a5";
            const oldRefreshTokenKey = "6efb918fd5c0eb4d6ab5b227f20f57a5";
            const oldDeviceFingerPrintKey = "6efb918fd5c0eb4d6ab5b227f20f57a5";
            const newAccessTokenKeyVersion = "v2";
            const newRefreshTokenKeyVersion = "v2";
            const newDeviceFingerPrintKeyVersion = "v2";
            const newAccessTokenKey = "6efb918fd5c0eb4d6ab5b227f20f57a5";
            const newRefreshTokenKey = "6efb918fd5c0eb4d6ab5b227f20f57a5";
            const newDeviceFingerPrintKey = "6efb918fd5c0eb4d6ab5b227f20f57a5";
            const data = {
                oldAccessTokenKeyVersion,
                oldRefreshTokenKeyVersion,
                oldDeviceFingerPrintKeyVersion,
                oldAccessTokenKey,
                oldRefreshTokenKey,
                oldDeviceFingerPrintKey,
                newAccessTokenKeyVersion,
                newRefreshTokenKeyVersion,
                newDeviceFingerPrintKeyVersion,
                newAccessTokenKey,
                newRefreshTokenKey,
                newDeviceFingerPrintKeyVersion,
                newDeviceFingerPrintKey
            };
            return callback(null,data);
        } catch (error) {
            console.log("error in the fetching the valid keys",error.message);
            return callback(
                {
                    code:500,
                    message:error.message,
                },
            );
        }
    }
};