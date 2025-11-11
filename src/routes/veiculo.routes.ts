import { Router } from 'express';
import { VeiculoController } from '../controllers/veiculo.controller';
import { upload } from '../middlewares/upload.middleware';

const router = Router();
const controller = new VeiculoController();

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findById);

router.post(
  '/:id/imagens', 
  upload.single('foto'),
  controller.addImage
);

export default router;