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