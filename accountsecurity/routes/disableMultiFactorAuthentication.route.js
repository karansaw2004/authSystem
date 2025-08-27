import {handleDisableMultiFactorAuthentication} from "../controllers/disableMultiFactorAuthentication.controller.js";
import {disableMultiFactorAuthenticationMiddleware} from "../middlewares/disableMultiFactorAuthentication.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";

export function disableMultiFactorAuthenticationRoute(fastify) {
    fastify.route(
        {
            method: "POST",
            url: "/",
            schema: {
                body: {
                    type: "object",
                    properties: {
                        securityKey: { type: "string" },
                        deviceFingerPrint: { type: "string" }
                    },
                    required: ["securityKey", "deviceFingerPrint"]
                },
                headers: {
                    type: "object",
                    properties: {
                        authorization: { type: "string" }
                    },
                    required: ["authorization"]
                }
            },
            preHandler: [
                verifyAccessToken,
                verifyDevice,
                disableMultiFactorAuthenticationMiddleware
            ],
            handler: handleDisableMultiFactorAuthentication
        }
    )
}
