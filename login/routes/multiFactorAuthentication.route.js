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
                        mfaCode: { type: "string", minLength: 6, maxLength: 6 },
                        deviceFingerPrint: { type: "string" },
                    },
                    required: ["mail", "mfaCode", "deviceFingerPrint"],
                },
            },
            preHandler: multiFactorAuthenticationMiddleware,
            handler: handleMultiFactorAuthentication,
        }
    );
};
