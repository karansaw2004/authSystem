import { ApiError } from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {redis} from "../config/index.js";
import {User} from "../schema/user.modle.js";
import {generateOtp} from "../helpers/generateOtp.helper.js";
import {maskMail} from "../helpers/maskMail.helper.js";


export async function handleUpdateRecoveryMail(req,reply) {
    try {
        const { userId, recoveryMail,deviceFingerPrintHash} = req.body;
        let user = await redis.get(`user:${userId}`);
        let fromDb = false;
        if (!user) {
            user = await User.findById({userId});
            if (!user) {
                return reply.send(new ApiError("User not found", 404));
            };
            fromDb = true;
        };
        if (!fromDb) {
            user = JSON.parse(user);
        };
        const otp = generateOtp().toString();
        await redis.set(`updateRecovery:${userId}`, JSON.stringify({ otp, recoveryMail,deviceFingerPrintHash}), 300);
        return reply.send(new ApiResponse({otpSent:true,mail:maskMail(recoveryMail)}, "Otp sent to the recovery mail", 200));
    } catch (error) {
        console.log("error in the main handle function of the recovery mail",error.message);
        return reply.send(new ApiError("Internal server error",500));
    };
};