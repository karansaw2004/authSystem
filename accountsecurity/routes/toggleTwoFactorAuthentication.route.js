import {handleToggleTwoFactorAuthentication} from "../controllers/toggleTwoFactorAuthentication.controller.js";
import {toggleTwoFactorAuthenticationMiddleware} from "../middlewares/toggleTwoFactorAuthentication.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";


export function toggleTwoFactorAuthenticationRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/toggle-2fa",
            preHandler: [verifyAccessToken, verifyDevice, toggleTwoFactorAuthenticationMiddleware],
            handler: handleToggleTwoFactorAuthentication
        }
    )
}