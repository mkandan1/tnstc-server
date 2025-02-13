const express = require('express');
const validate = require('../../middlewares/validate');
const { scheduledBusValidation } = require('../../validations');
const { scheduledBusController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

// POST route to create a new scheduled bus
router.post('/add', auth('manageScheduleBus'), validate(scheduledBusValidation.createScheduledBus), scheduledBusController.createScheduledBus);

// GET route to fetch all scheduled buses
router.get('/', auth('viewScheduledBus'), scheduledBusController.getAllScheduledBuses);

// GET route to fetch a specific scheduled bus by ID
router.get('/:id', auth('viewScheduledBus'), scheduledBusController.getScheduledBusById);

// PUT route to update a specific scheduled bus
router.put('/:id', auth('manageScheduleBus'), validate(scheduledBusValidation.updateScheduledBus), scheduledBusController.updateScheduledBus);

// DELETE route to delete a specific scheduled bus
router.delete('/:id', auth('manageScheduleBus'), scheduledBusController.deleteScheduledBus);

// POST route to update the bus location
// router.post('/update-location/:id', auth('updateLocation'), scheduledBusController.updateBusLocation);

// GET route to retrieve the current bus location
// router.get('/location/:id', auth('viewScheduledBus'), scheduledBusController.getBusLocation);


module.exports = router;
