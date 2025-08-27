import {handleMultiFactorAuthentication} from "../controllers/multiFactorAuthentication.controller.js";
import {multiFactorAuthenticationMiddleware} from "../middlewares/multiFactorAuthentication.router.js";

export function multiFactorAuthenticationRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/",
            schema: {
                body: {
                    type: "object",
                    properties: {
                        mail: { type: "string", format: "email" },
                        securityKey: { type: "string" },
                        deviceFingerPrint: { type: "string" },
                    },
                    required: ["mail", "securityKey", "deviceFingerPrint"],
                },
            },
            preHandler: multiFactorAuthenticationMiddleware,
            handler: handleMultiFactorAuthentication,
        }
    );
};
