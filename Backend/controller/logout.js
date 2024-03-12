import { UserModel } from '../models/user.js';


//controller to delete acceesstoken and refresh, also on client
export const logoutTokenController = async(req,res) =>{

 
   const cookies = req.cookies


   if(!cookies?.jwt) return res.status(204).json({'logout Controler': 'NO content'})

   const refreshToken = cookies.jwt
   try {
      const [user] = await UserModel.findOneByToken(refreshToken) 

      if(!user) {
         res.clearCookie('jwt',{httpOnly:true})   
        return res.status(403).json({'logout Controller':'forbidden'});
     }

     //Delete refreshToken
     const {success, message} = await UserModel.deleteToken(refreshToken)
           res.clearCookie('jwt',{httpOnly: true, sameSite: 'None', secure: true})  
            res.status(200).json({'logout Controller': message})
     console.log('logged out');
    
   } catch (error) {
      return  res.status(500).json('logoutTokenController:  '+ error)
   }
   
}

