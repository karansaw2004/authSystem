import {handleUpdateDob} from "../controllers/updateDob.controller.js";
import {updateDobMiddleware} from "../middlewares/updateDob.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";


export function updateDobRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/update-dob",
            preHandler: [verifyAccessToken, verifyDevice, updateDobMiddleware],
            handler: handleUpdateDob
        }
    )
}