import {redis} from "../config/index.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {ApiError} from "../err/api.err.js";
import {User} from "../schema/user.modle.js";
import {securityManager} from "../security/securityManager.security.js";


export async function handleCheckUserId(req,reply) {
    try {
        const {mail,deviceFingerPrint} = req.body;
        const userId = securityManager.createUserId(mail);
        let user = await redis.get(`reserve:${userId}`);
        if (!user) {
            user = await redis.get(`user:${userId}`);
            if (user) {
                return reply.send(new ApiResponse({available:false},"success", 200));
            }
        };
        if(user){
            user = JSON.parse(user);
            const verify = securityManager.verifyDeviceFingerPrintHash(deviceFingerPrint,user.deviceFingerPrintHash);
            if(!verify.success){
                return reply.send(new ApiResponse({available:false},"success", 200));
            };
            await redis.set(`reserve:${userId}`, JSON.stringify(user), 300);
            return reply.send(new ApiResponse({available:true},"success", 200));
        };
        user = await User.findOne({userId:userId});
        if (user) {
            let data = {...user};
            data.deviceFingerPrintHash = securityManager.createDeviceFingerPrintHash(deviceFingerPrint);
            await redis.setWithoutExpiration(`user:${userId}`, JSON.stringify(data));
            return reply.send(new ApiResponse({available:false},"success", 200));
        };
        const deviceFingerPrintHash = securityManager.createDeviceFingerPrintHash(deviceFingerPrint);
        await redis.set(`reserve:${userId}`, JSON.stringify({deviceFingerPrintHash}), 300);
        return reply.send(new ApiResponse({available:true},"success", 200));
    } catch (error) {
        console.log("error in the main handle function of the check user id",error);
        return reply.send(new ApiError("Internal Server Error", 500));
    }
};