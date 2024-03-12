import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.js';
import jwt from 'jsonwebtoken';
import { ROLES_LIST } from '../config/rolesList.js';


export const loginController = async(req,res) =>{
   const {email,password} = req.body;

   try {
      const [user] = await UserModel.findOne(email) 

      const AllUserRoles = await UserModel.findUserRoles(user.user_id)
      const userRolesId = []
       AllUserRoles.forEach(role=> role.user_id == user.user_id && userRolesId.push(role.role_id))
      console.log(userRolesId);
     
      const validPassword = await bcrypt.compare(password,user.password)
      if(!validPassword) return res.status(401).json({msg: 'Wrong password'})

      //create jwt
      const accessToken = jwt.sign(
            { "userInfo":{
               "email": email ,
               "roles": userRolesId
               }
            },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            {expiresIn: '1m'}
        )
   
      const refreshToken = jwt.sign(
            {"email": email },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            {expiresIn: '1h'}
         )

         const input = {refreshToken,email}
         await UserModel.insertToken({input})
         const [userWithToken] = await UserModel.findOne(email) 
         console.log(userWithToken);
      
      res.cookie('jwt',refreshToken,{httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000})
      res.status(200).json({userRolesId, accessToken})
      
   } catch (error) {
      return  res.status(500).json('Logging controller:  '+ error)
   }
   
}

