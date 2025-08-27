import {handleResendOtpLogin} from "../controllers/resendOtpLogin.controller.js";
import {resendOtpLoginMiddleware} from "../middlewares/resendOtpLogin.middleware.js";

export function resendOtpLoginRoute(fastify,opts) {
    fastify.route(
        {
            method: "POST",
            url:"/",
            schema:{
                body:{
                    type: "object",
                    properties: {
                        mail: {type: "string",format: "email"},
                        deviceFingerPrint: {type: "string"},
                    },
                    required: ["mail","deviceFingerPrint"],
                }
            },
            preHandler: resendOtpLoginMiddleware,
            handler: handleResendOtpLogin,
        }
    )
}