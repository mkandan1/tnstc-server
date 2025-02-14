import express from 'express';
import { busStopController } from '../../controllers/index.js';

const router = express.Router();

router.post('/', busStopController.addBusStop);
router.get('/', busStopController.getBusStops);
router.put('/:id', busStopController.updateBusStop);
router.delete('/:id', busStopController.deleteBusStop);
router.get('/:id', busStopController.getBusStopById);

export default router;
