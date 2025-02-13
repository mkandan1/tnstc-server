const express = require('express');
const routeController = require('../../controllers/route.controller');
const validate = require('../../middlewares/validate');
const routeValidation = require('../../validations/route.validation');
const auth = require('../../middlewares/auth');

const router = express.Router();

// POST route to create a new route
router.post('/', auth('manageRoutes'), validate(routeValidation.createRoute), routeController.createRoute);

// GET route to fetch all routes
router.get('/', auth('viewRoute'), routeController.getAllRoutes);

// GET route to fetch a specific route by ID
router.get('/:id', auth('viewRoute'), routeController.getRouteById);

// PUT route to update a specific route
router.put('/:id', auth('manageRoutes'), validate(routeValidation.updateRoute), routeController.updateRoute);

// DELETE route to delete a specific route
router.delete('/:id', auth('manageRoutes'), routeController.deleteRoute);


module.exports = router;
