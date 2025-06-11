import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/tiendaRopa';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB conectado: ${conn.connection.name}`);
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
    console.log("MONGO_URI:", process.env.MONGO_URI);
    process.exit(1);
  }
};

export default connectDB;