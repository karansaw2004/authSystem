import {handleUpdateDob} from "../controllers/updateDob.controller.js";
import {updateDobMiddleware} from "../middlewares/updateDob.middleware.js";

export function updateDobRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/update-dob",
            preHandler: [updateDobMiddleware],
            handler: handleUpdateDob
        }
    )
}