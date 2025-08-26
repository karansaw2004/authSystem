import {verifyAccessToken} from "../helpers/verifyAccessToken.helper.js";
import {getAllLoginHistoryMiddleware} from "../middlewares/getAllLoginHistory.middleware.js";
import {handleGetAllLoginHistory} from "../controllers/getAllLoginHistory.controller.js";
import {verifyDevice} from "../helpers/verifyDevice.helper.js";

export function getAllLoginHistoryRoute(fastify, options) {
    fastify.route(
        {
            method: "POST",
            url: "/user/login/history",
            schema: {
                response: {
                    200: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                userId: { type: "string" },
                                loginTime: { type: "string", format: "date-time" },
                                device: { type: "string" },
                                ipAddress: { type: "string" }
                            }
                        }
                    }
                },
                body: {
                    type: "object",
                    properties: {
                        deviceFingerPrint: { type: "string" }
                    }
                }
            },
            preHandler: [verifyAccessToken,verifyDevice,getAllLoginHistoryMiddleware],
            handler: handleGetAllLoginHistory
        }
    );
}