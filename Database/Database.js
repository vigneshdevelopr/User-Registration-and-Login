import mongoose from 'mongoose';

export function createConnection(){
    const params = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.mongo_url, params);
        console.log('Your Mongodb Connected Successfully');
    } catch (error) {
        console.log({message: error.message})
    }
}