import express from 'express';
import { statisticsController } from '../../controllers/index.js';

const router = express.Router();

router.get('/', statisticsController.getStatistics)

export default router