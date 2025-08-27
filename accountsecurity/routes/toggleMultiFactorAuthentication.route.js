import {handleToggleMultiFactorAuthentication} from "../controllers/toggleMultiFactorAuthentication.controller.js";
import {toggleMultiFactorAuthenticationMiddleware} from "../middlewares/toggleMultiFactorAuthentication.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";

export function toggleMultiFactorAuthenticationRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/toggle-mfa",
            preHandler: [verifyAccessToken, verifyDevice, toggleMultiFactorAuthenticationMiddleware],
            handler: handleToggleMultiFactorAuthentication
        }
    )
}