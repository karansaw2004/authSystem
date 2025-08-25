import {handleLogOut} from "../controllers/logout.controller.js";
import {logoutMiddleware} from "../middlewares/logout.middleware.js";
import {verifyAccessTokenMiddleware} from "../middlewares/verifyAccessToken.middleware.js";


export function logoutRoute(fastify, options) {
    fastify.route(
        {
            method: "POST",
            url: "/user/logout",
            schema: {
                response: {
                    200: {
                        type: "object",
                        properties: {
                            message: { type: "string" }
                        }
                    }
                },
                security: [
                    {
                        apiKey: []
                    }
                ],
                body: {
                    type: "object",
                    properties: {
                        deviceFingerPrint: { type: "string" }
                    }
                }
            },
            preHandler: [verifyAccessTokenMiddleware, logoutMiddleware],
            handler: handleLogOut
        }
    )
}