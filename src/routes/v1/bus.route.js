const express = require('express');
const validate = require('../../middlewares/validate');
const { busValidation } = require('../../validations');
const { busController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/add-bus', auth('manageRoutes', 'manageScheduleBus'), validate(busValidation.createBus), busController.addBus);
router.get('/get-bus/:id', auth('viewRoute'), busController.getBus);
router.get('/get-all-buses', auth('viewRoute'), busController.getBuses);
router.put('/update-bus/:id', auth('manageRoutes', 'manageScheduleBus'), validate(busValidation.updateBus), busController.updateBus);
router.delete('/delete-bus/:id', auth('manageRoutes', 'manageScheduleBus'), busController.deleteBus);

module.exports = router;
