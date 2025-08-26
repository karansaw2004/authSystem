import {ApiError} from "../err/api.err.js";
import {ApiResponse} from "../res/apiResponse.res.js";
import {redis} from "../config/index.js";
import {securityManager} from "../security/securityManager.security.js";
import {User} from "../schema/user.modle.js";
import {verifyPassword} from "../services/verifyPassword.service.js";
import {generateOtp} from "../helpers/generateOtp.helper.js";
import {Login} from "../schema/login.modle.js";
import {SendOtp} from "../utils/sendOtp.util.js";
import {maskMail} from "../helpers/maskMail.helper.js";

export async function handleLogin(req, reply) {
    try {
        const { mail, password, deviceFingerPrint } = req.body;
        const userId = securityManager.createUserId(mail);
        let fromDb = false;
        let user = await redis.get(userId);
        if (!user) {
            user = await User.findOne({ userId });
            if (!user) {
                return reply.send(new ApiError("user not found", 404));
            };
            fromDb = true;
        };
        if (!fromDb) {
            user = JSON.parse(user); 
        };
        const verifyUserPassword = await verifyPassword(password, user.hashedPassword);
        if (!verifyUserPassword.isValid) {
            return reply.send(new ApiError("invalid password", 401));
        };
        const deviceFingerPrintHash = securityManager.createDeviceFingerPrintHash(deviceFingerPrint);
        if (user.multiFactorAuthentication || (user.multiFactorAuthentication && user.twoFactorAuthentication)) {
            let twoFactorAuthenticationEnabled = false;
            if ((user.multiFactorAuthentication && user.twoFactorAuthentication)) {
                twoFactorAuthenticationEnabled = true;
            }
            await redis.set(`multiFactorAuthentication:${userId}`, JSON.stringify({ deviceFingerPrintHash, twoFactorAuthenticationEnabled, securityKey: user.hashedSecurityKey }), 300);
            return reply.send(new ApiResponse({ multiFactorAuthenticationEnabled: true }, "success", 201));
        };
        if (user.twoFactorAuthentication) {
            const otp = generateOtp().toString();
            const sendOtp = await SendOtp(mail,"for login", otp);
            if (!sendOtp) {
                console.log("error in sending otp");
                return reply.send(new ApiError("Internal Server Error", 500));
            }
            await redis.set(`twoFactorAuthentication:${userId}`, JSON.stringify({ otp, deviceFingerPrintHash }), 300);
            return reply.send(new ApiResponse({ twoFactorAuthenticationEnabled: true, otpSent: true, mail: maskMail(mail) }, "success", 201));
        };
        if (user.multiFactorAuthentication && user.twoFactorAuthentication) {
            await redis.set(`multiFactorAuthentication:${userId}`, JSON.stringify({ deviceFingerPrintHash, twoFactorAuthenticationEnabled: true }), 300);
        };
        const saveLoginDetail = await Login.create({ userId, deviceFingerPrintHash, ipAddress: req.ip });
        if (!saveLoginDetail) {
            console.log("error in saving login detail");
            return reply.send(new ApiError("Internal server error",500));
        };

        const accessTokenPayload = {
            userId: userId,
            deviceFingerPrintHash,
        };
        const refreshTokenPayload = {
            userId: userId,
            deviceFingerPrintHash,
            mail: user.mail,
            profileImageUrl:user.profileImageUrl,
            name: user.name,
        };
        return reply.send(new ApiResponse({ userId:userId,accessToken: securityManager.createAccessToken(accessTokenPayload, "1d"), refreshToken: securityManager.createRefreshToken(refreshTokenPayload, "7d") }, "success", 200));
    } catch (error) {
        console.log("error in the main handle function of the login function", error.message);
        return reply.send(new ApiError("internal server error", 500));
    };
};
