import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // console.log('Connected to Mongodb');
  } catch (error) {
    console.log('Error connecting to MONGODB : ', error);
  }
};
