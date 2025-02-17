import express from 'express';
import { scheduledBusController } from '../../controllers/index.js';

const router = express.Router();

// POST route to create a new scheduled bus
router.post('/', scheduledBusController.createScheduledBus);

// GET route to fetch all scheduled buses
router.get('/',  scheduledBusController.getAllScheduledBuses);

// GET route to fetch a specific scheduled bus by ID
router.get('/:id', scheduledBusController.getScheduledBusById);

// PUT route to update a specific scheduled bus
router.put('/:id', scheduledBusController.updateScheduledBus);

// DELETE route to delete a specific scheduled bus
router.delete('/:id', scheduledBusController.deleteScheduledBus);

// POST route to update the bus location
// router.post('/update-location/:id', auth('updateLocation'), scheduledBusController.updateBusLocation);

// GET route to retrieve the current bus location
// router.get('/location/:id', auth('viewScheduledBus'), scheduledBusController.getBusLocation);


export default router;
