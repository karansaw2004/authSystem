import {handleLogOut} from "../controllers/logout.controller.js";
import {logoutMiddleware} from "../middlewares/logout.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";

export function logoutRoute(fastify, options) {
    fastify.route(
        {
            method: "POST",
            url: "/",
            schema: {
                body: {
                    type: "object",
                    properties: {
                        deviceFingerPrint: { type: "string" }
                    },
                    required: ["deviceFingerPrint"]
                },
                headers: {
                    type: "object",
                    properties: {
                        authorization: { type: "string" }
                    },
                    required: ["authorization"],
                    additionalProperties: true
                }
            },
            preHandler: [verifyAccessToken,verifyDevice,logoutMiddleware],
            handler: handleLogOut
        },
    );
};