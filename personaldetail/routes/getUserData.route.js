import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {handleGetAllUserData} from "../controllers/getUserData.controller.js";
import {getUserDataMiddleware} from "../middlewares/getUserData.middleware.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";

export function getUserDataRoute(fastify, options) {
    fastify.route(
        {
            method:"POST",
            url:"/",
            schema:{
                body:{
                    type: "object",
                    properties:{
                        deviceFingerPrint:{type:"string"}
                    },
                    required:["deviceFingerPrint"]
                },
                headers:{
                    type: "object",
                properties: {
                    authorization: { type: "string" },
                },
                required: ["authorization"],
                additionalProperties: true,
                }
            },
            preHandler: [verifyAccessToken, verifyDevice, getUserDataMiddleware],
            handler: handleGetAllUserData
        }
    )
}