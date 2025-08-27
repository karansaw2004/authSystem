import {handleResendOtpRegister} from "../controllers/resendOtpRegister.controller.js";
import {resendOtpRegisterMiddleware} from "../middlewares/resendOtpRegister.middleware.js";

export function resendOtpRegisterRoute(fastify,opts) {
    fastify.route(
        {
            method: "POST",
            url:"/",
            schema:{
                body:{
                    type: "object",
                    properties:{
                        mail: {type: "string",format: "email"},
                        deviceFingerPrint: {type: "string"},
                    },
                    required: ["mail","deviceFingerPrint"],
                    additionalProperties: false,
                },
            },
            preHandler: resendOtpRegisterMiddleware,
            handler: handleResendOtpRegister,
        }
    )
}