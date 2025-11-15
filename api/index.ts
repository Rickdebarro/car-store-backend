import express, {Request, Response} from "express";
import cors from 'cors';
import veiculoRoutes from './routes/veiculo.routes.js';
import db from './database/mongo.js';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

dotenv.config();

const App = express();
App.use(cors());
App.use(express.json());

const PORT = process.env.PORT || 3000;

db.connect();

App.use('/api/veiculos', veiculoRoutes);

// Swagger UI e JSON
App.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
App.get('/api-docs.json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

App.get("/", (req: Request, res: Response) => {
  res.send({ message: "Program Running." });
});

App.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

