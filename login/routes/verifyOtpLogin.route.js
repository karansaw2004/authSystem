import {handleVerifyOtpLogin} from "../controllers/verifyOtpLogin.controller.js";
import {verifyOtpLoginMiddleware} from "../middlewares/verifyOtpLogin.middleware.js";
export function verifyOtpLoginRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/",
            schema: {
                body: {
                    type: "object",
                    properties: {
                        mail: { type: "string", format: "email" },
                        otp: { type: "string", minLength: 6, maxLength: 6 },
                        deviceFingerPrint: { type: "string" },
                    },
                    required: ["mail", "otp", "deviceFingerPrint"],
                },
            },
            preHandler: verifyOtpLoginMiddleware,
            handler: handleVerifyOtpLogin,
        }
    );
};
