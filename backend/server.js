import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import router from './routes/customerRoutes.js';
import connectDB from './config/dbConnect.js';
import cors from 'cors';

dotenv.config();

const app = express();

connectDB();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/customers', router);

app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})