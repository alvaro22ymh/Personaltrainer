
import { UserModel } from '../models/user.js';
import jwt, { decode } from 'jsonwebtoken';

//controller to refresh de accestoken veryfing the refresToken on db
export const refreshTokenController = async(req,res) =>{
   const cookies = req.cookies


   if(!cookies?.jwt) return res.json({'msg':'refreshcontroler'})
   const refreshToken = cookies.jwt
   try {
      const [user] = await UserModel.findOneByToken(refreshToken) 

      if(!user) return res.sendStatus(403); //forbidden

      const AllUserRoles = await UserModel.findUserRoles(user.user_id)
      const userRolesId = []
      AllUserRoles.forEach(role=> role.user_id == user.user_id && userRolesId.push(role.role_id))
     console.log(userRolesId);
    

      //evaluate jwt
      jwt.verify(
         refreshToken,
         process.env.REFRESH_TOKEN_SECRET_KEY,
         (err,decoded)=>{
            
               if(err || user.email !== decoded.email) return res.sendStatus(403);
               const accessToken = jwt.sign(
                  {"userInfo":
                        {"email": decoded.email,
                        "roles": userRolesId
                        }
               },
                   process.env.ACCESS_TOKEN_SECRET_KEY,
                   {expiresIn: '1m'}
               );
               return res.json({accessToken})
         }
      )

    
   } catch (error) {
      return  res.status(500).json('refreshTokenController:  '+ error)
   }
   
}

