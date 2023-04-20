import mongoose from 'mongoose';
const RestaurantSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true,
        maxlength: 35,
        trim: true,
    },
    image:{
        type:"string",
        required: true,
        maxlength: 1000,
        trim: true,
    },
    rating:{
        type:'string',
        required: true,
        maxlength:35,
        trim: true,
    },
    location:{
        type:'string',
        required: true,
        maxlength:35,
        trim: true,
    },
    cuisines:{
        type:'string',
        required: true,
        maxlength:300,
        trim: true,
    }
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)
export{Restaurant}