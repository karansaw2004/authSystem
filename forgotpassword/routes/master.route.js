import {forgotPasswordRoute} from "./forgotpassword.route.js";
import {verifyOtpForgotPasswordRoute} from "./veriffyOtpForgotpassword.route.js";

export function masterRoute(fastify, opts) {
    fastify.register(forgotPasswordRoute, {prefix: '/forgotpassword'});
    fastify.register(verifyOtpForgotPasswordRoute, {prefix: '/verifyotpforgotpassword'});
};
