import {handleUpdateRecoveryMail} from "../controllers/updateRecoveryMail.controller.js";
import {updateRecoveryMailMiddleware} from "../middlewares/updateRecoveryMail.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";


export function updateRecoveryMailRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/",
            schema:{
                body: {
                    type: "object",
                    properties: {
                        recoveryMail: { type: "string", format: "email" },
                        deviceFingerPrint: { type: "string" }
                    },
                    required: ["recoveryMail", "deviceFingerPrint"]
                },
                headers: {
                    type: "object",
                    properties: {
                        authorization: { type: "string" }
                    },
                    required: ["authorization"]
                }
            },
            preHandler: [verifyAccessToken, verifyDevice, updateRecoveryMailMiddleware],
            handler: handleUpdateRecoveryMail
        }
    )
}
