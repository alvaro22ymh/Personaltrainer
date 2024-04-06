
import { dbConnection } from '../index.js';



export class UserModel {

    static async findOrCreate({googleId,email='',name='',userRole=[]}){
   
        function generarNombreUnico(name) {
            // Generar 5 números aleatorios entre 0 y 9
            const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10));
            // Concatenar los números aleatorios con el nombre de usuario
            const username = `${name}${numbers.join('')}`;
            return username;
          }
          
          const username = generarNombreUnico(name);
          const noSpace = username.replace(/\s/g, '')
      
            const [data] = await dbConnection.query('SELECT * FROM user WHERE google_id=?',[googleId])
          
            if(data.length > 0){
                const userData = data[0]
                if (userData.hasOwnProperty('user_id')){
                   
                    return data[0]
                    }
                    
                }else{
                                   await dbConnection.query('INSERT INTO user (google_id,email,username) VALUES (?,?,?)',[googleId,email,noSpace])
                                   await dbConnection.query('INSERT INTO user_role (user_id, role_id) VALUES ((SELECT user_id FROM user WHERE email = ?), (SELECT role_id FROM role WHERE role_id = ?))', [email, userRole])
                   const [data] = await dbConnection.query('SELECT * FROM user WHERE google_id=?',[googleId])

                   return data[0]
            }
               
                    
         }
        


    static async create({input}){
        const {username,email,roles,hashedPassword} = input;

        const lowerCaseUsername = username.toLowerCase()

        try {
            await dbConnection.query('INSERT INTO user (username,email,password) VALUES (?,?,?)',[lowerCaseUsername, email,hashedPassword],(error, results, fields) => {
                if (error) {
                    console.error('Error while creating user:', error);
                    return;
                }
                console.log(`Rol user created successfully'${username}'.`);
            })

            roles.forEach((roleName) => {
                dbConnection.query('INSERT INTO user_role (user_id, role_id) VALUES ((SELECT user_id FROM user WHERE username = ?), (SELECT role_id FROM role WHERE name = ?))', [username, roleName],(error, results, fields) => {
                    if (error) {
                        console.error('Error al asignar el rol al usuario:', error);
                        return;
                    }
                    console.log(`Rol '${roleName}' asignado correctamente al usuario '${username}'.`);
                });
            })
            
        }catch (error) {
            throw new Error("FAILED TO CREATE USER: "+error) 
     
        }
        const [data] = await dbConnection.query('SELECT * FROM user WHERE username=?',[lowerCaseUsername])
        return data
    }

    static async findOne(email){
     const lowerCase = email.toLowerCase();

        try {
        const [data] = await dbConnection.query('SELECT * FROM user WHERE email=?',[lowerCase])
            return data;
        
        } catch (error) {
            throw new Error('db Error: '+error)
        }
    }
    static async findUserRoles(userId){
     
        try {
        const [AllUserRoles] = await dbConnection.query('SELECT * FROM user_role')
    //    const [data]= await dbConnection.query('SELECT * FROM role WHERE role_id=(SELECT role_id FROM user_role WHERE user_id=?)',[userId])
        return AllUserRoles;
        
        } catch (error) {
            throw new Error('db Error: '+error)
        }
    }
    static async findOneByToken(refreshToken){
        try {
        const [data] = await dbConnection.query('SELECT * FROM user WHERE refreshToken=?',[refreshToken])
            return data;
        
        } catch (error) {
            throw new Error('db Error: '+error)
        }
    }
    static async findById(id){
        try {
        const [data] = await dbConnection.query('SELECT * FROM user WHERE user_id=?',[id])
            return data;
        
        } catch (error) {
            throw new Error('db Error: '+error)
        }
    }


    static async insertToken({input}){
        const {refreshToken,email} = input;
        console.log('refresh token insertion '+refreshToken);
        try {
            const res = await dbConnection.query('UPDATE user SET refreshToken=? WHERE email=?',[refreshToken, email])

            return { success: true, message: 'Token inserted successfully.' };
            
        } catch (error) {
            throw new Error('DB error:' +error)
        }
    }
    



    static async deleteToken(refreshToken){
        

        try {
            await dbConnection.query('UPDATE user SET refreshToken=NULL WHERE refreshToken=?',[refreshToken])
            return { success: true, message: 'Token DELETED successfully.' };
        } catch (error) {
            throw new Error('DB error:' +error)
        }
    }



    static async updateOnePwd({input}){
        const {email,hashedPassword} = input
        const lowercaseemail = email.toLowerCase();

        try {
            const [data]=await dbConnection.query('UPDATE user SET password=? WHERE email=?',[hashedPassword,lowercaseemail])
            return data
        } catch (error) {
            throw new Error('db Error Updating password: '+ error)
        }
    }
    static async updateOneEmail({input}){
        const {email,oldEmail} = input
        const lowercaseEmail = email.toLowerCase();
        const lowercaseOldEmail = oldEmail.toLowerCase();

        try {
            const [data]=await dbConnection.query('UPDATE user SET email=? WHERE email=?',[lowercaseEmail,lowercaseOldEmail])
            return data
        } catch (error) {
            throw new Error('db Error Updating password: '+ error)
        }
    }
}