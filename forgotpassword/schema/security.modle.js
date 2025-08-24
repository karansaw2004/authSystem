import mongoose from "mongoose";

const securitySchema = new mongoose.Schema(
    {
        hashedSecuriteyKey:{
            type:String,
            required:true,
        },
        userId:{
            type:String,
            required:true,
            unique:true,
        }
    },
    {
        timestamps:true,
    }
);

export const Security = mongoose.model("Security",securitySchema);