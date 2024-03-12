import bcrypt from 'bcrypt'

export const hashPassword=async(password,saltRounds) =>{
    try {
        const salt = await bcrypt.genSalt(saltRounds) 
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    } catch (error) {
        console.log('Error hashing password-> '+error);
        throw error
    }
    
}
export const hashToken=async(token,saltRounds) =>{
    try {
        const salt = await bcrypt.genSalt(saltRounds) 
        const hashedToken = await bcrypt.hash(token, salt)
        return hashedToken
    } catch (error) {
        console.log('Error hashing token-> '+error);
        throw error
    }
    
}