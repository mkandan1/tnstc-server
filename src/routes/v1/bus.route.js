import express from 'express';
import { busController } from '../../controllers/index.js';

const router = express.Router();

router.post('/', busController.addBus);
router.get('/', busController.getBuses);
router.put('/:id', busController.updateBus);
router.delete('/:id', busController.deleteBus);
router.get('/:id', busController.getBus);

export default router;
