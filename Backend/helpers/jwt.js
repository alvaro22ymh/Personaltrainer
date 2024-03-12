import { sign } from 'jsonwebtoken';

// Clave secreta para firmar el token



const secretKey = process.env.SECRET_KEY
const 

// Datos que deseas incluir en el token (por ejemplo, el ID del usuario)
const payload = {
  userId: '123456789',
  username: 'usuario',
  role: 'usuario'
};

// Opciones del token (puedes especificar el tiempo de expiración, etc.)
const options = {
  expiresIn: '1h' // El token expirará en 1 hora
};

// Crear el token JWT
const accessToken = sign(payload, secretKey, options);

console.log('Token de acceso:', accessToken);
