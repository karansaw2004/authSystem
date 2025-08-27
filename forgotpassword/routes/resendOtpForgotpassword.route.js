import {handleResendOtpForgotPassword} from "../controllers/resendOtpForgotPassword.controller.js";
import {resendOtpLoginForgotPassword} from "../middlewares/resendOtpForgotpassword.middleware.js";


export function resendOtpForgotPassword(fastify,opts) {
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
            preHandler: resendOtpLoginForgotPassword,
            handler: handleResendOtpForgotPassword,
        }
    )
    
}