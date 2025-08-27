import { handleDeleteAccount } from "../controllers/deleteAccount.controller.js";
import { deleteAccountMiddleware } from "../middlewares/deleteAccount.middleware.js";
import { verifyAccessToken } from "../helpers/verifyAccessToken.helper.js";
import { verifyDevice } from "../helpers/verifyDevice.helper.js";

export function deleteAccountRoute(fastify, opts) {
  fastify.route({
    method: "DELETE",
    url: "/",
    schema: {
      body:{
        type: "object",
        properties: {
          deviceFingerPrint: { type: "string" },
        },
        required: ["deviceFingerPrint"],
      },
      headers: {
        type: "object",
        properties: {
          authorization: { type: "string" },
        },
        required: ["authorization"],
        additionalProperties: true, 
      },
    },
    preHandler: [verifyAccessToken, verifyDevice, deleteAccountMiddleware],
    handler: handleDeleteAccount,
  });
}
