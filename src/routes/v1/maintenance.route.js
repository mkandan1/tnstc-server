import express from 'express';
import { maintenanceController } from '../../controllers/index.js';

const router = express.Router();

router.get('/status', maintenanceController.getMaintenanceStatus);

router.post('/status', maintenanceController.setMaintenanceStatus);

export default router;