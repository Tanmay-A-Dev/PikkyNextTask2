import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flights';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let isConnected = false; 

export const connectToDatabase = async () => {
    if (isConnected) {
        return;
    }

    try {
        const conn = await mongoose.connect(MONGODB_URI);
        isConnected = conn.connection.readyState === 1; 
        console.log('MongoDB connected:', conn.connection.host);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};