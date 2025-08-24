import mongoose  from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        address:{
            type:{
                state:{
                    type:String,
                },
                country:{
                    type:String,
                },
                district:{
                    type:String,
                },
                pincode:{
                    type:Number,
                },
                remark:{
                    type:String,
                }
            }
        },
    },
    {
        timeseries:true,
    }
);

export const Address = mongoose.model("Address",addressSchema);