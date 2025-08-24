import {handleToggleTwoFactorAuthentication} from "../controllers/toggleTwoFactorAuthentication.controller.js";
import {toggleTwoFactorAuthenticationMiddleware} from "../middlewares/toggleTwoFactorAuthentication.middleware.js";

export function toggleTwoFactorAuthenticationRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/toggle-2fa",
            preHandler: [toggleTwoFactorAuthenticationMiddleware],
            handler: handleToggleTwoFactorAuthentication
        }
    )
}