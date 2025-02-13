const express = require('express');
const validate = require('../../middlewares/validate');
const driverValidation = require('../../validations/driver.validation');
const driverController = require('../../controllers/driver.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

// POST route to create a new driver
router.post('/', auth('manageDrivers'), validate(driverValidation.createDriver), driverController.addDriver);

// GET route to fetch a specific driver by ID
router.get('/:id', auth('manageDrivers'), driverController.getDriver);

// GET route to fetch all drivers
router.get('/', auth('manageDrivers'), driverController.getAllDrivers);

// PUT route to update a specific driver
router.put('/:id', auth('manageDrivers'), validate(driverValidation.updateDriver), driverController.updateDriver);

// DELETE route to delete a specific driver
router.delete('/:id', auth('manageDrivers'), driverController.deleteDriver);



module.exports = router;
