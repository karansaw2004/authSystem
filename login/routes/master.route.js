import {loginRoute} from "./login.route.js";
import {multiFactorAuthenticationRoute} from "./multiFactorAuthentication.route.js";
import {verifyOtpLoginRoute} from "./verifyOtpLogin.route.js";
import {resendOtpLoginRoute} from "./resendOtpLogin.route.js";
export function masterRoute(fastify,opts) {
    fastify.register(loginRoute, { prefix: '/login' });
    fastify.register(multiFactorAuthenticationRoute, { prefix: '/multifactorauthentication' });
    fastify.register(verifyOtpLoginRoute, { prefix: '/verifyotplogin' });
    fastify.register(resendOtpLoginRoute, { prefix: '/resendotplogin' });
}