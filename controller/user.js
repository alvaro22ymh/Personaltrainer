
import { hashPassword } from '../helpers/bycript.js';
import { UserModel } from '../models/user.js';

export const createUser = async(req,res) =>{
    const {username,email,password} = req.body
  
    
    const saltRounds = 10;
    const hashedPassword = await hashPassword(password,saltRounds)
    const input = {username,email,hashedPassword}
    try {
        const data = await UserModel.create({input})
        res.json(data);
        
    } catch (error) {
        res.status(500).json(error);
    }

}