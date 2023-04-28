import express from 'express';
import { User } from '../Models/Users.js';
import { Otp } from '../Models/otp.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/forgotpassword', (req, res) => {
  try {
    return res.status(200).send('Hey this is Forgot Password Section!');
  } catch (error) {
    console.log('message' + error.message);
    return res.status(500).send('Error: ' + error.message);
  }
});

router.post('/email-send', async (req, res) => {
  try {
    let data = await User.findOne({ email: req.body.email });
    const responseType = {};
    if (data) {
      let otpCode = Math.floor(Math.random() * 10000 + 1);
      console.log(otpCode);
      let otpData = new Otp({
        email: req.body.email,
        code: otpCode,
        expireIn: new Date().getTime() + 300 * 1000,
      });
      let otpResponse = await otpData.save();
      responseType.statusText = 'Success';
      responseType.message = 'Check your email';
      console.log(otpResponse);

      // Nodemailer setup
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.email, 
          pass: process.env.password, 
        },
      });

      // Email content
      const mailOptions = {
        from: 'vigneshwebdevelopr@gmail.com', // replace with your email address
        to: req.body.email, // replace with user's email
        subject: 'Password Reset Request',
        text: `Dear ${data.name},\n\nYou recently requested to reset your password for your account.\n\nUse the following OTP to reset your password: ${otpCode}\n\nIf you did not request a password reset, please ignore this email.\n\nThanks,\nYour FoodyVille App Team`,
      };

      // Send email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } else {
      responseType.statusText = 'Error';
      responseType.message = 'Email not found';
      console.log('error');
    }
    return res.status(200).send(responseType);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error: ' + error.message);
  }
});

router.post('/change-password', async (req, res) => {
  try {
    let data = await Otp.findOne({ email: req.body.email, code: req.body.otpCode });
    const response = {};
    if (data) {
      let currentTime = new Date().getTime();
      let difference = data.expireIn - currentTime;
      if (difference < 0) {
        response.message = 'Token expired';
        response.statusCode = 'Error';
      } else {
        const password = req.body.password;
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            let user = await User.findOne({ email: req.body.email });
            user.password = hashedPassword;
            user.save();
            response.message = 'Password changed successfully!';
        response.statusCode = 'Success';
        console.log(response)

return res.status(200).json(response)

          
        } catch (error) {
            console.log(error)
            return res.status(500).json('Some error in hashing')
        }
        
      }
    } else {
      response.message = 'Invalid OTP';
      response.statusCode = 'Error';
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(response);
  }
});



export const Forgotpassword = router;
