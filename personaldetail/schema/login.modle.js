import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    deviceFingerPrintHash: { type: String, required: true },
    ipAddress: { type: String, required: true },
    currentStatus:{
        type:String,
        enum:["active","deActive"],
        default:"active",
    }
});

export const Login = mongoose.model("Login", loginSchema);
