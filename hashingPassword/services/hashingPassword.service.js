import argon from "argon2";
export const services = {
    hashPassword: async (call, callback) => {
        try {
            const { password } = call.request;
            if (!password) {
                return callback(
                    {
                        code:400,
                        message:"password is required"
                    },
                );
            };
            const hashedPassword = await argon.hash(password);
            const data = { hashedPassword };
            return callback(null, data);
        } catch (error) {
            console.error("error in hashPassword service:", error);
            return callback({
                code: 500,
                message: error.message
            });
        }
    },
    verifyPassword: async (call, callback) => {
        try {
            const {password,hashedPassword} = call.request;
            if (!password || !hashedPassword) {
                return callback(
                    {
                        code: 400,
                        message: "password and hashedPassword are required"
                    },
                );
            };
            const isValid = await argon.verify(hashedPassword, password);
            const data = {isValid}
            return callback(null, data);
        } catch (error) {
            console.log("error in verify password service",error.message);
            return callback(
                {
                    code:500,
                    message:error.message,
                }
            )
        }
    }
};