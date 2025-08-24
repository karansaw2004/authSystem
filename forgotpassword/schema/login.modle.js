import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    deviceFingerPrintHash: { type: String, required: true },
    ipAddress: { type: String, required: true }
});

export const Login = mongoose.model("Login", loginSchema);
