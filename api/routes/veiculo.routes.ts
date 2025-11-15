import { Router } from 'express';
import { VeiculoController } from '../controllers/veiculo.controller.js';
import { upload } from '../middlewares/upload.middleware.js';
import { protectedMiddleware } from '../middlewares/jwt.token.middleware.js';

const router = Router();
const controller = new VeiculoController();

//router.post('/', protectedMiddleware, controller.create);
//router.get('/', protectedMiddleware, controller.findAll);
//router.get('/:id', protectedMiddleware, controller.findById);

/**
 * @openapi
 * /api/veiculos:
 *   post:
 *     tags:
 *       - Veiculos
 *     summary: Cria um veículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VeiculoCreate'
 *     responses:
 *       201:
 *         description: Veículo criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       400:
 *         description: Erro de validação
 */
router.post('/',  controller.create);

/**
 * @openapi
 * /api/veiculos:
 *   get:
 *     tags:
 *       - Veiculos
 *     summary: Lista veículos (com filtros opcionais via query)
 *     responses:
 *       200:
 *         description: Lista de veículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Veiculo'
 */
router.get('/',  controller.findAll);

/**
 * @openapi
 * /api/veiculos/{id}:
 *   get:
 *     tags:
 *       - Veiculos
 *     summary: Busca veículo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do veículo
 *     responses:
 *       200:
 *         description: Veículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       404:
 *         description: Não encontrado
 */
router.get('/:id',  controller.findById);

/**
 * @openapi
 * /api/veiculos/{id}/imagens:
 *   post:
 *     tags:
 *       - Veiculos
 *     summary: Faz upload de imagem do veículo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagem registrada no veículo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       400:
 *         description: Nenhum arquivo enviado
 */
router.post(
  '/:id/imagens', 
  upload.single('foto'),
  controller.addImage
);

export default router;