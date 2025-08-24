import {checkUserIdRoute} from "./checkUserId.route.js";
import {registerRoute} from "./register.route.js";
import {verifyOtpRegisterRoute} from "./verifyOtpRegister.route.js";
export function masterRoute(fastify,opts) {
    fastify.register(checkUserIdRoute, { prefix: "/checkuserid" });
    fastify.register(registerRoute, { prefix: "/register" });
    fastify.register(verifyOtpRegisterRoute, { prefix: "/verifyotpregister" });
};
