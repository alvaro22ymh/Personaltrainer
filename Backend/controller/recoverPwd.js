
import { RecoverModel } from '../models/recoverPwd.js';
import nodemailer from "nodemailer";
import { loginController } from './auth.js';
import { hashPassword } from '../helpers/bycript.js';
import { UserModel } from '../models/user.js';

export const forgotPwd = async(req,res) =>{
    const { email } = req.body;

    // generate uuid 
    const token = Math.round(Math.random()*999999);

    //save uuid on db
    try {
       const save = RecoverModel.saveToken({user:email,token})
    } catch (error) {
        return res.status(500).json({'RecoverPwd controller': error.message})
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
        subject: "recover password Trainer", // Subject line
        text: `Codigo de recuperacion: ${token}`, // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId,`${token}`);
      res.status(200).json({'recoverPwd controller':'Email recover sent'})
  } catch (error) {
    res.status(500).json({'RecoverPwd controller': error.message})
  }
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>


}


export const verifyToken = async(req,res) =>{

    const {token} = req.body
  

    console.log(token);
    try {
        const data = await RecoverModel.getToken({token:token});
 
        if(data[0]?.['id']){
            const deleteToken = await RecoverModel.deleteToken({token:token}); //crear este modelo 
            return res.status(200).json({'verifyToken controller': 'Successfully validation'})
        }
       res.status(400).json({'verifyToken controller':'Invalid token'})
    } catch (error) {
        res.status(500).json({'verifyTokenController ':error.message})
        console.log(error.message);
    }

}

export const recoverUserPwd = async(req,res)=>{
    const {email,password} = req.body;

    const saltRounds = 10
    const hashedPassword = await hashPassword(password,saltRounds);
    const input ={email,hashedPassword}
    try {
        const data = await UserModel.updateOnePwd({input})
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
}