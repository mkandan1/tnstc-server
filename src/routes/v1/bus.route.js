import express from 'express';
import { busController } from '../../controllers/index.js';

const router = express.Router();

router.post('/add-bus', busController.addBus);
router.get('/get-bus/:id', busController.getBus);
router.get('/get-all-buses', busController.getBuses);
router.put('/update-bus/:id', busController.updateBus);
router.delete('/delete-bus/:id', busController.deleteBus);

export default router;
