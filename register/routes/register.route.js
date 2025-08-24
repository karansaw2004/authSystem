import {handleRegister} from "../controllers/register.controller.js";
import {registerMiddleware} from "../middlewares/register.middleware.js";

export function registerRoute(fastify,opts) {
    fastify.route(
        {
            method: "POST",
            url: "/",
            schema: {
                body: {
                    type: "object",
                    properties: {
                        mail: { type: "string", format: "email" },
                        password: { type: "string", minLength: 8 },
                        deviceFingerPrint: { type: "string" },
                        name: { type: "string" },
                    },
                    required: ["mail", "password", "deviceFingerPrint", "name"]
                }
            },
            preHandler: [registerMiddleware],
            handler: handleRegister,
        }
    )
}