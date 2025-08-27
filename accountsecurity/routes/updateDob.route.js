import {handleUpdateDob} from "../controllers/updateDob.controller.js";
import {updateDobMiddleware} from "../middlewares/updateDob.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";


export function updateDobRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/",
            schema:{
                body: {
                    type: "object",
                    properties: {
                        dob: { type: "string" },
                        deviceFingerPrint: {type: "string"}
                    },
                    required: ["dob", "deviceFingerPrint"]
                },
                headers: {
                    type: "object",
                    properties: {
                        authorization: { type: "string" }
                    },
                    required: ["authorization"]
                },
            },
            preHandler: [verifyAccessToken, verifyDevice, updateDobMiddleware],
            handler: handleUpdateDob
        }
    )
}