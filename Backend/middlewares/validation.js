import { validationResult } from 'express-validator';


export const Validator = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
        stop()
    }
    next();
}

export const fieldsValidatorStopper = (req,res,end) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){

        return res.status(400).json({errors});
    }
    end();
}