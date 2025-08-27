import {handleUpdateName} from "../controllers/updateName.controller.js";
import {updateNameMiddleware} from "../middlewares/updateName.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";


export function updateNameRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/",
            schema:{
                body: {
                    type: "object",
                    properties: {
                        newName: { type: "string" },
                        deviceFingerPrint: { type: "string" }
                    },
                    required: ["newName","deviceFingerPrint"]
                },
                headers: {
                    type: "object",
                    properties: {
                        authorization: { type: "string" }
                    },
                    required: ["authorization"]
                },
            },
            preHandler: [verifyAccessToken, verifyDevice, updateNameMiddleware],
            handler: handleUpdateName
        }
    )
}
