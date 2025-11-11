import { Router } from 'express';
import { VeiculoController } from '../controllers/veiculo.controller';
import { upload } from '../middlewares/upload.middleware';
import { protectedMiddleware } from '../middlewares/jwt.token.middleware';

const router = Router();
const controller = new VeiculoController();

//router.post('/', protectedMiddleware, controller.create);
//router.get('/', protectedMiddleware, controller.findAll);
//router.get('/:id', protectedMiddleware, controller.findById);

router.post('/',  controller.create);
router.get('/',  controller.findAll);
router.get('/:id',  controller.findById);

router.post(
  '/:id/imagens', 
  upload.single('foto'),
  controller.addImage
);

export default router;