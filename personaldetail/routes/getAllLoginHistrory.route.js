import { verifyAccessToken } from "../helpers/verifyAccessToken.helper.js";
import { getAllLoginHistoryMiddleware } from "../middlewares/getAllLoginHistory.middleware.js";
import { handleGetAllLoginHistory } from "../controllers/getAllLoginHistory.controller.js";
import { verifyDevice } from "../helpers/verifyDevice.helper.js";

export function getAllLoginHistoryRoute(fastify, options) {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: {
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
    preHandler: [verifyAccessToken, verifyDevice, getAllLoginHistoryMiddleware],
    handler: handleGetAllLoginHistory,
  });
}
