import {handleUpdatePassword} from "../controllers/updatePassword.controller.js";
import {updatePasswordMiddleware} from "../middlewares/updatePassword.middleware.js";
import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";


export function updatePasswordRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/update-password",
            preHandler: [verifyAccessToken, verifyDevice, updatePasswordMiddleware],
            handler: handleUpdatePassword
        }
    )
}
