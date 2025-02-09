import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import router from './routes/customerRoutes.js';
import connectDB from './config/dbConnect.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();

connectDB();
app.use(cors());
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/customer', router);

app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})