import {handleUpdateName} from "../controllers/updateName.controller.js";
import {updateNameMiddleware} from "../middlewares/updateName.middleware.js";


export function updateNameRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/update-name",
            preHandler: [updateNameMiddleware],
            handler: handleUpdateName
        }
    )
}
