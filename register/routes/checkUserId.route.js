import {handleCheckUserId} from "../controllers/checkUserId.controller.js";
import {checkUserIdMiddleware} from "../middlewares/checkUserId.middleware.js";
export function checkUserIdRoute(fastify,opts) {
    fastify.route(
        {
            method:"POST",
            url:"/",
            schema:{
                body:{
                    type:"object",
                    properties:{
                        mail:{type:"string",format:"email"},
                        deviceFingerPrint:{type:"string"}
                    },
                    required:["mail","deviceFingerPrint"]
                }
            },
            preHandler:checkUserIdMiddleware,
            handler:handleCheckUserId,
        }
    );
};