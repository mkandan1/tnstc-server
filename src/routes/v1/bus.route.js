import express from 'express';
import { busController } from '../../controllers/index.js';
import { uploadBusPhoto } from '../../config/chunk.js';

const router = express.Router();

router.post('/', uploadBusPhoto.single('busImage'), busController.addBus);
router.get('/', busController.getBuses);
router.put('/:id', busController.updateBus);
router.delete('/:id', busController.deleteBus);
router.get('/:id', busController.getBus);

export default router;
