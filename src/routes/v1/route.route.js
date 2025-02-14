import express from 'express';
import { routeController } from '../../controllers/index.js';

const router = express.Router();

// POST route to create a new route
router.post('/', routeController.createRoute);

// GET route to fetch all routes
router.get('/',  routeController.getAllRoutes);

// GET route to fetch a specific route by ID
router.get('/:id', routeController.getRouteById);

// PUT route to update a specific route
router.put('/:id', routeController.updateRoute);

// DELETE route to delete a specific route
router.delete('/:id', routeController.deleteRoute);


export default router;
