import {handleDeleteAccount} from "../controllers/deleteAccount.controller.js";
import {deleteAccountMiddleware} from "../middlewares/deleteAccount.middleware.js";

export function deleteAccountRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/",
            schema:{
                body: {
                    type: "object",
                    properties: {
                        userId: { type: "string" }
                    },
                    required: ["userId"]
                },
                headers: {
                    type: "object",
                    properties: {
                        authorization: { type: "string" }
                    },
                    required: ["authorization"]
                }
            },
            preHandler: [deleteAccountMiddleware],
            handler: handleDeleteAccount
        }
    )
}