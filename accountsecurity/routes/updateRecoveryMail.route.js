import {handleUpdateRecoveryMail} from "../controllers/updateRecoveryMail.controller.js";
import {updateRecoveryMailMiddleware} from "../middlewares/updateRecoveryMail.middleware.js";


export function updateRecoveryMailRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/update-recovery-mail",
            preHandler: [updateRecoveryMailMiddleware],
            handler: handleUpdateRecoveryMail
        }
    )
}
