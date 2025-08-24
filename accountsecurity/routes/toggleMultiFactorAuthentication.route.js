import {handleToggleMultiFactorAuthentication} from "../controllers/toggleMultiFactorAuthentication.controller.js";
import {toggleMultiFactorAuthenticationMiddleware} from "../middlewares/toggleMultiFactorAuthentication.middleware.js";


export function toggleMultiFactorAuthenticationRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/toggle-mfa",
            preHandler: [toggleMultiFactorAuthenticationMiddleware],
            handler: handleToggleMultiFactorAuthentication
        }
    )
}