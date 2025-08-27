import {handleUpdateName} from "../controllers/updateName.controller.js";
import {updateNameMiddleware} from "../middlewares/updateName.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";


export function updateNameRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/update-name",
            preHandler: [verifyAccessToken, verifyDevice, updateNameMiddleware],
            handler: handleUpdateName
        }
    )
}
