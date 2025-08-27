import {deleteAccountRoute} from "./deleteAccount.route.js";
import {deleteRecoveryMailRoute} from "./deleteRecoveryMail.route.js";
// import {g} from "./getPreSignedUrl.route.js";
import {enableMultiFactorAuthenticationRoute} from "./enableMultiFactorAuthentication.route.js";
import {disableMultiFactorAuthenticationRoute} from "./disableMultiFactorAuthentication.route.js";
import {toggleTwoFactorAuthenticationRoute} from "./toggleTwoFactorAuthentication.route.js";
import {updateDobRoute} from "./updateDob.route.js";
import {updateNameRoute} from "./updateName.route.js";
import {updatePasswordRoute} from "./updatePassword.route.js";
import {updateRecoveryMailRoute} from "./updateRecoveryMail.route.js";
import {verifyOtpRecoveryMailRoute} from "./verifyOtpRecoveryMail.route.js";
import {resendOtpRecoveryMailRoute} from "./resendOtpRecoveryMail.route.js";

export function masterRoute(fastify, opts) {
    fastify.register(deleteAccountRoute, { prefix: "/deleteaccount" });
    fastify.register(deleteRecoveryMailRoute, { prefix: "/deleterecoverymail" });
    // fastify.register(g, { prefix: "/account" });
    fastify.register(enableMultiFactorAuthenticationRoute, { prefix: "/enablemultifactorauthentication" });
    fastify.register(disableMultiFactorAuthenticationRoute, { prefix: "/disablemultifactorauthentication" });
    fastify.register(toggleTwoFactorAuthenticationRoute, { prefix: "/twofactorauthentication" });
    fastify.register(updateDobRoute, { prefix: "/updatedob" });
    fastify.register(updateNameRoute, { prefix: "/updatename" });
    fastify.register(updatePasswordRoute, { prefix: "/updatepassword" });
    fastify.register(updateRecoveryMailRoute, { prefix: "/updaterecoverymail" });
    fastify.register(verifyOtpRecoveryMailRoute, { prefix: "/verifyotprecoverymail" });
    fastify.register(resendOtpRecoveryMailRoute, { prefix: "/resendotprecoverymail" });
};