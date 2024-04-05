
import { RegisterTokenModel } from "../models/createAccountToken.js";
import nodemailer from "nodemailer";


export const sendToken = async(req,res) =>{
    const {email} = req.body
    // generate uuid 
    const token = Math.round(Math.random()*999999);

    //save uuid on db
    try {
       const save = RegisterTokenModel.saveToken({token})
    } catch (error) {
        return res.status(500).json({'CreateAccountToken controller': error.message})
    }



    // Configurar el transportador de correo
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,  
        secure: false,
        auth: {
            user: 'albertha82@ethereal.email',
            pass: 'SafMg2dBBxftHuvwhN'
        }
    });


    // async..await is not allowed in global scope, must use a wrapper
  try {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: 'albertha82@ethereal.email', // sender address
        to: email, // list of receivers
        subject: "email verification Trainer", // Subject line
        text: `Codigo de rverificacion: ${token}`, // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId,`${token}`);
      res.status(200).json({'createAccountToken controller':'verification Email sent'})
  } catch (error) {
    res.status(500).json({'createAccountToken controller': error.message})
  }
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>


}


export const verifyToken = async(req,res) =>{

    const {token} = req.body
  

    console.log(token);
    try {
        const data = await RegisterTokenModel.getToken({token:token});
 
        if(data[0]?.['id']){
            const deleteToken = await RegisterTokenModel.deleteToken({token:token}); //crear este modelo 
            return res.status(200).json({'createAccountToken controller': 'Successfully validation'})
        }
       res.status(400).json({'verifyToken controller':'Invalid token'})
    } catch (error) {
        res.status(500).json({'verifyTokenController ':error.message})
        console.log(error.message);
    }

}

