import {handleVerifyOtpForgotPassword} from "../controllers/verifyOtpForgotPassword.controller.js";
import {verifyOtpForgotPasswordMiddleware} from "../middlewares/verifyOtpForgotpassword.middleware.js";


export function verifyOtpForgotPasswordRoute(fastify, opts) {
    fastify.route({
        method: "POST",
        url: "/verify-otp",
        schema: {
            body: {
                type: "object",
                properties: {
                    mail: { type: "string", format: "email" },
                    otp: { type: "string" },
                    deviceFingerPrint: { type: "string" }
                },
                required: ["mail", "otp", "deviceFingerPrint"]
            }
        },
        preHandler: verifyOtpForgotPasswordMiddleware,
        handler: handleVerifyOtpForgotPassword
    });
};