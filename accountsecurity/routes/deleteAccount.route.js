import {handleDeleteAccount} from "../controllers/deleteAccount.controller.js";
import {deleteAccountMiddleware} from "../middlewares/deleteAccount.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";

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
            preHandler: [verifyAccessToken, verifyDevice, deleteAccountMiddleware],
            handler: handleDeleteAccount
        }
    )
}