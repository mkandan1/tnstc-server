const { Route } = require('../models');
const ApiError = require('../utils/ApiError');

// Create a new route
const createRoute = async (routeData) => {
  try {
    const route = new Route(routeData);
    await route.save();
    return route;
  } catch (error) {
    throw new ApiError(500, 'Error creating route');
  }
};

// Get all routes
const getAllRoutes = async () => {
  try {
    return await Route.find()
    .populate("origin", "name coordinates active")
    .populate("destination", "name coordinates active");
  } catch (error) {
    throw new ApiError(500, 'Error fetching routes');
  }
};

// Get a specific route by ID
const getRouteById = async (id) => {
  try {
    const route = await Route.findById(id)
      .populate("origin", "name coordinates active")
      .populate("destination", "name coordinates active")
      .populate("stops.stopId", "name coordinates active");
    if (!route) {
      throw new ApiError(404, 'Route not found');
    }
    return route;
  } catch (error) {
    throw new ApiError(500, 'Error fetching route');
  }
};

// Update a route
const updateRoute = async (id, updateData) => {
  try {
    const route = await Route.findByIdAndUpdate(id, updateData, { new: true });
    if (!route) {
      throw new ApiError(404, 'Route not found');
    }
    return route;
  } catch (error) {
    throw new ApiError(500, 'Error updating route');
  }
};

// Delete a route
const deleteRoute = async (id) => {
  try {
    const route = await Route.findByIdAndDelete(id);
    if (!route) {
      throw new ApiError(404, 'Route not found');
    }
    return route;
  } catch (error) {
    throw new ApiError(500, 'Error deleting route');
  }
};

module.exports = {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
};
