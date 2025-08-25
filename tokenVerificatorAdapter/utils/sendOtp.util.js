import {redpanda} from "../config/index.js";

export async function SendOtp(to, subject, otp) {
    try {
        await redpanda.produceMessage("otp", { subject, otp, to });
        return true;
    } catch (error) {
        console.log("error in sending otp to redpanda",error.message);
        return false;
    }
};
