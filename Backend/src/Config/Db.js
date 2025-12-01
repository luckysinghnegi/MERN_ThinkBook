import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const ConnectDataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Data Base connected successfully")
    } catch (error) {
        console.log("error", error);  
    }
}