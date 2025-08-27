import {deleteAccountRoute} from "./deleteAccount.route.js";
import {deleteRecoveryMailRoute} from "./deleteRecoveryMail.route.js";
// import {g} from "./getPreSignedUrl.route.js";
import {toggleMultiFactorAuthenticationRoute} from "./toggleMultiFactorAuthentication.route.js";
import {toggleTwoFactorAuthenticationRoute} from "./toggleTwoFactorAuthentication.route.js";
import {updateDobRoute} from "./updateDob.route.js";
import {updateNameRoute} from "./updateName.route.js";
import {updatePasswordRoute} from "./updatePassword.route.js";
import {updateRecoveryMailRoute} from "./updateRecoveryMail.route.js";
import {verifyOtpRecoveryMailRoute} from "./verifyOtpRecoveryMail.route.js";

export function masterRoute(fastify, opts) {
    fastify.register(deleteAccountRoute, { prefix: "/account" });
    fastify.register(deleteRecoveryMailRoute, { prefix: "/account" });
    // fastify.register(g, { prefix: "/account" });
    fastify.register(toggleMultiFactorAuthenticationRoute, { prefix: "/account" });
    fastify.register(toggleTwoFactorAuthenticationRoute, { prefix: "/twofactorauthentication" });
    fastify.register(updateDobRoute, { prefix: "/account" });
    fastify.register(updateNameRoute, { prefix: "/account" });
    fastify.register(updatePasswordRoute, { prefix: "/account" });
    fastify.register(updateRecoveryMailRoute, { prefix: "/account" });
    fastify.register(verifyOtpRecoveryMailRoute, { prefix: "/account" });
}