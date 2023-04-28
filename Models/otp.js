import mongoose from 'mongoose';
const otpSchema = new mongoose.Schema({

    email: {
        type: 'string',
        required: true,
        unique: true,
        maxlength: 35,
        trim: true,
    },
    code:{
        type: 'string',
        required: true,
    },
    expireIn: Number,

})

const Otp = mongoose.model("otp", otpSchema)

export{Otp};