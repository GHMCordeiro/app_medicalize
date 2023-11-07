import mongoose from "mongoose";

const farm = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    name:{
        type: String
    },
    address:{
        type: String
    },
    localization:{
        latitude:{
            type:String
        },
        longitude:{
            type:String
        }
    },
    phone:{
        type: String
    }
})

export default farm