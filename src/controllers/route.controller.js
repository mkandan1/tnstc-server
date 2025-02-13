const catchAsync = require('../utils/catchAsync');
const routeService = require('../services/route.service');
const ApiError = require('../utils/ApiError');

// Create a new route
const createRoute = catchAsync(async (req, res) => {
  const route = await routeService.createRoute(req.body);
  res.status(201).send(route);
});

// Get all routes
const getAllRoutes = catchAsync(async (req, res) => {
  const routes = await routeService.getAllRoutes();
  res.status(200).send(routes);
});

// Get a specific route by ID
const getRouteById = catchAsync(async (req, res) => {
  const route = await routeService.getRouteById(req.params.id);
  res.status(200).send(route);
});

// Update a route
const updateRoute = catchAsync(async (req, res) => {
  const route = await routeService.updateRoute(req.params.id, req.body);
  res.status(200).send(route);
});

// Delete a route
const deleteRoute = catchAsync(async (req, res) => {
  await routeService.deleteRoute(req.params.id);
  res.status(204).send();
});

module.exports = {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
};
