import {handleUpdateRecoveryMail} from "../controllers/updateRecoveryMail.controller.js";
import {updateRecoveryMailMiddleware} from "../middlewares/updateRecoveryMail.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";


export function updateRecoveryMailRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/update-recovery-mail",
            preHandler: [verifyAccessToken, verifyDevice, updateRecoveryMailMiddleware],
            handler: handleUpdateRecoveryMail
        }
    )
}
