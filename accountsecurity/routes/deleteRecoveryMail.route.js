import {handleDeleteRecoveryMail} from "../controllers/deleteRecoveryMail.controller.js";
import {deleteRecoveryMailMiddleware} from "../middlewares/deleteRecoveryMail.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";

export function deleteRecoveryMailRoute(fastify, opts) {
    fastify.route(
        {
            method: "DELETE",
            url: "/",
            schema:{
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
                    required: ["authorization"]
                }
            },
            preHandler: [verifyAccessToken, verifyDevice, deleteRecoveryMailMiddleware],
            handler: handleDeleteRecoveryMail
        }
    );
};