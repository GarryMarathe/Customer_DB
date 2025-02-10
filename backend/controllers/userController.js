import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { setUser } from '../services/authService.js';

// Signup Controller
export const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;

     // Check if the user already exists
     const existingUser = await User.findOne({ email });
     if (existingUser) {
         return res.status(400).json({ error: "User already exists" });
     }

    const newUser = new User({ name, email, password });
    await newUser.save();
     // Redirect to the login page with a success message
       // Send a JSON response indicating successful creation
       return res.status(201).json({ message: "User created successfully! Please log in." });
};

// Login Controller
export const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = setUser(user);
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });  // Store token in cookie for 1 hour
    console.log(token)
    return res.status(200).json({ message: "Login successful", token });
};

