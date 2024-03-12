export const verifyRoles = (...allowedRoles) => {
    return (req,res,next) =>{
        if(!req?.roles) return res.status(401).json({"verifyRoles": "No roles"})
        const rolesArray = [...allowedRoles]
     
        const result = rolesArray.some(role => req.roles.includes(role));

        if(!result) return res.status(401).json({"verifyRoles":"Unauthorized"});
        next();

    }
}