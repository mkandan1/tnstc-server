const express = require('express');
const managerController = require('../../controllers/manager.controller');
const validate = require('../../middlewares/validate');
const managerValidation = require('../../validations/manager.validation');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/add', auth('manageManagers'), validate(managerValidation.createManager), managerController.createManager); 
router.get('/:id', auth('viewProfile'), managerController.getManagerById); 
router.put('/:id', auth('updateProfile'), validate(managerValidation.updateManager), managerController.updateManager); 
router.delete('/:id', auth('manageUsers'), managerController.deleteManager); 
router.get('/', auth('viewProfile'), managerController.getAllManagers); 

module.exports = router;
