
import { ROLES_LIST } from '../config/rolesList.js';
import { hashPassword } from '../helpers/bycript.js';
import { UserModel } from '../models/user.js';
import jwt, { decode } from 'jsonwebtoken';

export const createUser = async(req,res) =>{
    const {username,email,roles,password} = req.body
 console.log(roles);
   const hasRole = roles.some(role=>(ROLES_LIST[role]))
    
    if(!hasRole) return res.status(400).json({'Create user controller': 'Roles invalid'})
    const saltRounds = 10;
    const hashedPassword = await hashPassword(password,saltRounds)
    const input = {username,email,roles,hashedPassword}
    try {
        const data = await UserModel.create({input})
        res.status(201).json({'msg':'User created successfully'});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({'create user controller': error});
    }

}


export const getUser = async(req,res)  =>{
    const {email} = req.query;

    try {
       
        const [rows,fields] = await UserModel.findOne(email);
        res.json(rows);
    } catch (error) {
        res.status(500).json({'GetUserController':error})
    }
}
export const getUserByRefreshToken = async(req,res)  =>{
    const cookies = req.cookies


   if(!cookies?.jwt) return res.json({'msg':'getUserByToken no cookies'})
   const refreshToken = cookies.jwt
   try {
      const [user] = await UserModel.findOneByToken(refreshToken) 

      if(!user) return res.sendStatus(403); //forbidden

      const AllUserRoles = await UserModel.findUserRoles(user.user_id)
      const userRolesId = []
      AllUserRoles.forEach(role=> role.user_id == user.user_id && userRolesId.push(role.role_id))

    


      //evaluate jwt
      jwt.verify(
         refreshToken,
         process.env.REFRESH_TOKEN_SECRET_KEY,
         (err,decoded)=>{
            
               if(err || user.email !== decoded.email) return res.sendStatus(403);
               
               res.json({user})
         }
      )

    
   } catch (error) {
      return  res.status(500).json('getUserByRefreshToken:  '+ error)
   }
   
}


export const updateUserPwd = async(req,res)=>{
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
export const updateUserEmail = async(req,res)=>{
    const {email,oldEmail} = req.body;

    const input ={email,oldEmail}
    try {
        const data = await UserModel.updateOneEmail({input})
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
}