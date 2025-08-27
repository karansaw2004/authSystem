import {handleResendOtpRecoveryMail} from "../controllers/resendOtpRecoveryMail.controller.js";
import {resendOtpRecoverMailMiddleware} from "../middlewares/resendOtpRecoveryMail.helper.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";

export function resendOtpRecoveryMailRoute(fastify,opts) {
    fastify.route(
        {
            method: 'POST',
            url: '/',
            schema: {
                body:{
                    type: 'object',
                    properties: {
                        deviceFingerPrint: {type: 'string'},
                    },
                    required: ['deviceFingerPrint'],
                },
                headers:{
                    type: 'object',
                    properties: {
                        authorization: {type: 'string'},
                    },
                    required: ['authorization'],
                    additionalProperties: false,
                }
            },
            preHandler: [verifyAccessToken, verifyDevice, resendOtpRecoverMailMiddleware],
            handler: handleResendOtpRecoveryMail,
        }
    )
}