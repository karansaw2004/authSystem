import {handleVerifyOtpRecoveryMail} from "../controllers/verifyOtpRecoveryMail.controller.js";
import {verifyOtpRecoveryMailMiddleware} from "../middlewares/verifyOtpRecoveryMail.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";



export function verifyOtpRecoveryMailRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/",
            schema:{
                body: {
                    type: "object",
                    properties: {
                        otp: { type: "string" },
                        deviceFingerPrint: { type: "string" }
                    },
                    required: ["otp", "deviceFingerPrint"]
                },
                headers: {
                    type: "object",
                    properties: {
                        authorization: { type: "string" }
                    },
                    required: ["authorization"]
                }
            },
            preHandler: [verifyAccessToken, verifyDevice, verifyOtpRecoveryMailMiddleware],
            handler: handleVerifyOtpRecoveryMail
        }
    )
}
