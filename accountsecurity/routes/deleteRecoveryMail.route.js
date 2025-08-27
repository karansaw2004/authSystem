import {handleDeleteRecoveryMail} from "../controllers/deleteRecoveryMail.controller.js";
import {deleteRecoveryMailMiddleware} from "../middlewares/deleteRecoveryMail.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";

export function deleteRecoveryMailRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/delete-recovery-mail",
            preHandler: [verifyAccessToken, verifyDevice, deleteRecoveryMailMiddleware],
            handler: handleDeleteRecoveryMail
        }
    )
}