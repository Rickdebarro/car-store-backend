import express from 'express';
import cors from 'cors';
import path from 'path';
import veiculoRoutes from './routes/veiculo.routes';
import { connectDB } from './database/mongo';



connectDB();


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/veiculos', veiculoRoutes);

export default app;