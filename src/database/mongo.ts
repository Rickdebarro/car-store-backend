import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI não definida no .env');
    }
    await mongoose.connect(mongoURI);
    console.log('MongoDB Conectado com Sucesso.');
  } catch (err) {
    console.error('Erro ao conectar no MongoDB:', err);
    process.exit(1); // Sai da aplicação se não conseguir conectar
  }
};