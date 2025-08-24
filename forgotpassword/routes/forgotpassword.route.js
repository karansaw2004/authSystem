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
                        email: { type: "string", format: "email" }
                    },
                    required: ["email"]
                }
            },
            preHandler: forgotPasswordMiddleware,
            handler: handleForgotPassword
        }
    )
}