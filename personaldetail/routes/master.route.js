// import {} from "./getAllLoginHistrory.route.js";
import {getUserDataRoute} from "./getUserData.route.js";
import {logoutRoute} from "./logout.route.js";

export function masterRoute(fastify, options) {
    // fastify.register(getAllLoginHistoryRoute, { prefix: "/user" });
    fastify.register(getUserDataRoute, { prefix: "/userd" });
    fastify.register(logoutRoute, { prefix: "/user" });
}