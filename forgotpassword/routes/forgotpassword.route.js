import {handleForgotPassword} from "../controllers/forgotpassword.controller.js";
import {forgotPasswordMiddleware} from "../middlewares/forgotpassword.middleware.js";

export function forgotPasswordRoute(fastify,opts) {
    fastify.route(
        {
            method: "POST",
            url: "/",
            schema:{
                body: {
                    type: "object",
                    properties: {
                        mail: { type: "string", format: "email" },
                        deviceFingerPrint: { type: "string" }
                    },
                    required: ["mail", "deviceFingerPrint"]
                }
            },
            preHandler: forgotPasswordMiddleware,
            handler: handleForgotPassword
        }
    )
}