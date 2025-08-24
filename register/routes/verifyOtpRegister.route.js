import {verifyOtpRegisterMiddleware} from "../middlewares/verifyOtpRegister.middleware.js";
import {handleVerifyOtpRegister} from "../controllers/verifyOtpRegister.controller.js"; // <-- Import the handler


export function verifyOtpRegisterRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/",
            schema:{
                body: {
                    type: "object",
                    properties: {
                        mail: { type: "string", format: "email" },
                        otp: { type: "string", minLength: 6, maxLength: 6 },
                        deviceFingerPrint: { type: "string" }
                    },
                    required: ["mail", "otp", "deviceFingerPrint"]
                },
            },
            preHandler: [verifyOtpRegisterMiddleware],
            handler: handleVerifyOtpRegister, 
        }
    )
}