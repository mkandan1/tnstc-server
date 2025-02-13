const express = require('express')
const router = express.Router();
const { maintenanceController } = require('../../controllers')

router.get('/status', maintenanceController.getMaintenanceStatus);

router.post('/status', maintenanceController.setMaintenanceStatus);

module.exports = router;