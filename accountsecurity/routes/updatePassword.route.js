import {handleUpdatePassword} from "../controllers/updatePassword.controller.js";
import {updatePasswordMiddleware} from "../middlewares/updatePassword.middleware.js";

export function updatePasswordRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/update-password",
            preHandler: [updatePasswordMiddleware],
            handler: handleUpdatePassword
        }
    )
}
