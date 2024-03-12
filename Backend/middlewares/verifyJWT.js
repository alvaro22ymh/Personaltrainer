import jwt from 'jsonwebtoken';

export const verityJWT = (req,res,next) =>{
    const authHeader = req.headers.authorization || req.headers.Authorization



    if(!authHeader) return res.status(401).json({'verifyJWT': 'unauthorized'});

    const token = authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(
       token,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        (err,decoded)=>{
            err?console.log(err) : console.log(decoded);;
            if(err) return res.sendStatus(403) //invalid token
            req.user = decoded.userInfo.email;
            req.roles = decoded.userInfo.roles;
  
            next();
        } 
    )
    
}





