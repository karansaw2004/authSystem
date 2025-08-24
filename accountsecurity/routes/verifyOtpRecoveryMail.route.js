import {handleVerifyOtpRecoveryMail} from "../controllers/verifyOtpRecoveryMail.controller.js";
import {verifyOtpRecoveryMailMiddleware} from "../middlewares/verifyOtpRecoveryMail.middleware.js";

export function verifyOtpRecoveryMailRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/verify-otp-recovery-mail",
            preHandler: [verifyOtpRecoveryMailMiddleware],
            handler: handleVerifyOtpRecoveryMail
        }
    )
}
