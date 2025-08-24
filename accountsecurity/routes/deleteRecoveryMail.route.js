import {handleDeleteRecoveryMail} from "../controllers/deleteRecoveryMail.controller.js";
import {deleteRecoveryMailMiddleware} from "../middlewares/deleteRecoveryMail.middleware.js";

export function deleteRecoveryMailRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/delete-recovery-mail",
            preHandler: [deleteRecoveryMailMiddleware],
            handler: handleDeleteRecoveryMail
        }
    )
}