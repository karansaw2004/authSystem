import {getAllLoginHistoryRoute} from "./getAllLoginHistrory.route.js";
import {getUserDataRoute} from "./getUserData.route.js";
import {logoutRoute} from "./logout.route.js";

export function masterRoute(fastify, options) {
    fastify.register(getAllLoginHistoryRoute, { prefix: "/getallloginhistory" });
    fastify.register(getUserDataRoute, { prefix: "/getuserdata" });
    fastify.register(logoutRoute, { prefix: "/logout" });
}