import { getUser } from '../services/authService.js';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
    }

    const user = getUser(token);
    if (!user) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    req.user = user;  // Attach user info to the request object for further use
    next();  // Proceed to the next middleware or route handler
};
