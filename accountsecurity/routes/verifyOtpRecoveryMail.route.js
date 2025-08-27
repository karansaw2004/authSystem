import {handleVerifyOtpRecoveryMail} from "../controllers/verifyOtpRecoveryMail.controller.js";
import {verifyOtpRecoveryMailMiddleware} from "../middlewares/verifyOtpRecoveryMail.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";



export function verifyOtpRecoveryMailRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/verify-otp-recovery-mail",
            preHandler: [verifyAccessToken, verifyDevice, verifyOtpRecoveryMailMiddleware],
            handler: handleVerifyOtpRecoveryMail
        }
    )
}
