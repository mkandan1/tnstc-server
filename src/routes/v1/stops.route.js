const express = require('express');
const validate = require('../../middlewares/validate');
const { busStopValidation } = require('../../validations');
const { busStopController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth('manageRoutes'), validate(busStopValidation.createBusStop), busStopController.addBusStop);
router.get('/', auth('viewRoute'), busStopController.getBusStops);
router.put('/:id', auth('manageRoutes'), validate(busStopValidation.updateBusStop), busStopController.updateBusStop);
router.delete('/:id', auth('manageRoutes'), busStopController.deleteBusStop);
router.get('/:id', auth('viewRoute'), busStopController.getBusStopById);

module.exports = router;
