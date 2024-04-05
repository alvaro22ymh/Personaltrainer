import { UserModel } from '../models/user.js';


//controller to delete acceesstoken and refresh, also on client
export const logoutTokenController = async(req,res) =>{

 
   const cookies = req.cookies


   if(!cookies?.jwt) return res.status(204).json({'logout Controler': 'NO content'})

   const refreshToken = cookies.jwt
   console.log(refreshToken);
   try {
      const [user] = await UserModel.findOneByToken(refreshToken) 

   //    if(!user) {
   //       res.cookie('jwt', '', { expires: new Date(0) });
   //      return res.status(403).json({'logout Controller':'forbidden'});
   //   }

     //Delete refreshToken
     const {success, message} = await UserModel.deleteToken(refreshToken)
            res.cookie('jwt', '', { expires: new Date(0) });
            res.status(200).json({'logout Controller': message})
     console.log('logged out');
    
   } catch (error) {
      return  res.status(500).json('logoutTokenController:  '+ error)
   }
   
}

