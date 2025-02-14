import express from 'express';
import { driverController } from '../../controllers/index.js';

const router = express.Router();

// POST route to create a new driver
router.post('/',  driverController.addDriver);

// GET route to fetch a specific driver by ID
router.get('/:id', driverController.getDriver);

// GET route to fetch all drivers
router.get('/', driverController.getAllDrivers);

// PUT route to update a specific driver
router.put('/:id', driverController.updateDriver);

// DELETE route to delete a specific driver
router.delete('/:id', driverController.deleteDriver);



export default router;
