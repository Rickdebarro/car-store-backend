import express, {Request, Response} from "express";
import cors from 'cors';
import veiculoRoutes from './routes/veiculo.routes';
import db from './database/mongo';
import dotenv from 'dotenv';

dotenv.config();

const App = express();
App.use(cors());
App.use(express.json());

const PORT = process.env.PORT || 3000;

db.connect();

App.use('/api/veiculos', veiculoRoutes);

App.get("/", (req: Request, res: Response) => {
  res.send({ message: "Program Running." });
});

App.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

