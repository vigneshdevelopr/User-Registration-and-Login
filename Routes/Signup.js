import express from 'express';
import { User, generateAuthToken } from '../Models/Users.js';
import bcrypt from 'bcrypt';


const router = express.Router();

router.get('/register', (req, res)=>{
    console.log('hey this is signup')
    return res.status(200).send('hey this is signup')
})
router.post('/register', async(req, res)=>{
    try {
      let user = await User.findOne({email: req.body.email})
      if(user){
        return res.status(409).json({message: 'This Email address already exists'})
      }  
      //hashing the password: 
      const salt = await bcrypt.genSalt(10)
      const hashedpassword = await bcrypt.hash(req.body.password, salt);

      user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword
      }).save();
      const token = generateAuthToken(user._id);
     return  res.status(201).json({message: `welcome ${req.body.name}, to FoodyVille `})

    } catch (error) {
       console.log(error);
     return   res.status(500).json({message: error.message}) 
    }
})

export const signup = router;