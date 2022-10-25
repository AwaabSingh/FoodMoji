import mongoose from 'mongoose';

const connectDB = async () => {
  try {
       await mongoose.connect(process.env.MOG0_URI!);
       console.log("Connected to db 🏂🏂🏂");
  } catch (error) {
   console.log("Failed to connect to db 🛑");
   console.error(error);
  }
}


export default connectDB