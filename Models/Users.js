import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true, 
        maxlength: 35,
        trim: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
        maxlength: 35,
        trim: true,
    },
    password:{
        type: 'string',
        required: true,
    }
})

const User = mongoose.model("user", userSchema)
const generateAuthToken = (id) =>{
    return jwt.sign({id}, process.env.SecretKey)
}
export{User,generateAuthToken};