import { ApiError } from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {redis} from "../config/index.js";
import {User} from "../schema/user.modle.js";
import {securityManager} from "../security/securityManager.security.js";

export async function handleToggleMultiFactorAuthentication(req,reply) {
    try {
        
    } catch (error) {
        console.log("error in the main handle function of the toggle multi factor authentication",error.message);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
}