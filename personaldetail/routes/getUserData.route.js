import {verifyAccessTokenMiddleware} from "../middlewares/verifyAccessToken.middleware.js";
import {handleGetAllUserData} from "../controllers/getUserData.controller.js";
import {getUserDataMiddleware} from "../middlewares/getUserData.middleware.js";


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
                security: [
                    {
                        apiKey: []
                    }
                ],
                body:{
                    type: "object",
                    properties:{
                        deviceFingerPrint:{type:"string"}
                    }
                }
            },
            preHandler: [verifyAccessTokenMiddleware, getUserDataMiddleware],
            handler: handleGetAllUserData
        }
    )
}