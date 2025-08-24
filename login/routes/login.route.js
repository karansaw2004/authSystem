import {handleLogin} from "../controllers/login.controller.js";
import {loginMiddleware} from "../middlewares/login.middleware.js";
export function loginRoute(fastify, opts) {
    fastify.route(
        {
            method:"POST",
            url:"/",
            schema:{
                body: {
                    type: "object",
                    properties: {
                        mail: { type: "string", format: "email" },
                        password: { type: "string", minLength: 6 },
                        deviceFingerPrint: { type: "string" },
                    },
                    required: ["mail", "password", "deviceFingerPrint"],
                },
            },
            preHandler:loginMiddleware,
            handler:handleLogin,
        },
    );
};
