import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
            unique:true,
        },
        name:{
            type:String,
            required:true,
            lowercase:true,
        },
        mail:{
            type:String,
            required:true,
            unique:true,
        },
        twoFactorAuthentication:{
            type:Boolean,
            default:false,
        },
        multiFactorAuthentication:{
            type:Boolean,
            default:false,
        },
        profileImageUrl:{
            type:String,
            default:"",
        },
        dob:{
            type:String,
            default:"",
        },
        hashedPassword:{
            type:String,
            required:true,
        },
        accountBasedOn:{
            type:String,
            required:true,
        },
        bannedInCountry:{
            type:String,
        },
        status:{
            type:String,
            enum:["activated","warning","blocked"],
            default:"activated"
        },
        recoveryMail:{
            type:String,
        },
        hashedSecurityKey:{
            type:String,
            default:null,
        },
    },
    {
        timeseries:true
    }
);

export const User = mongoose.model("User",userSchema);