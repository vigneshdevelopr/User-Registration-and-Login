import express from 'express';
import { Restaurant } from '../Models/Restaurent.js';

const router = express.Router();

router.get('/restaurant',async(req, res)=>{
  let a = await Restaurant.find()
  return  res.status(200).json(a); 
})

router.post('/restaurant', async(req, res)=>{

  let restaurant = await Restaurant.find();
  try {
    restaurant = await new Restaurant({
      name: req.body.name,
      image: req.body.image,
      rating: req.body.rating,
      location: req.body.location,
      cuisines: req.body.cuisines
     }).save()
     return res.status(200).send('Your restaurant has been Added successfully')
   
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

export const Restaurants = router;


