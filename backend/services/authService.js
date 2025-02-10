import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const secret = process.env.JWT_SECRET;  // JWT secret from the .env file

export function setUser(user) {
    const payload = {

        name: user.name,
        email: user.email,
       
    };

    return jwt.sign(payload, secret, { expiresIn: '1h' }); 
}

export function getUser(token) {
    if (!token) return null;

    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}
