import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {handleGetAllUserData} from "../controllers/getUserData.controller.js";
import {getUserDataMiddleware} from "../middlewares/getUserData.middleware.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";

export function getUserDataRoute(fastify, options) {
    fastify.route(
        {
            method:"POST",
            url:"/user/data",
            schema:{
                response:{
                    200:{
                        type:"object",
                        properties:{
                            userId:{type:"string"},
                            email:{type:"string"},
                            name:{type:"string"},
                            age:{type:"integer"}
                        }
                    }
                },
                body:{
                    type: "object",
                    properties:{
                        deviceFingerPrint:{type:"string"}
                    }
                }
            },
            preHandler: [verifyAccessToken, verifyDevice, getUserDataMiddleware],
            handler: handleGetAllUserData
        }
    )
}