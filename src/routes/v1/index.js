const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const busRoute = require('./bus.route');
const routeRoute = require('./route.route');
const driverRoute = require('./driver.route');
const scheduledBusRoute = require('./scheduledBus.route');
const maintenanceRoute = require('./maintenance.route');
const managerRoute = require('./manager.route');
const busStopsRoute = require('./stops.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/buses',
    route: busRoute, // New route for buses
  },
  {
    path: '/routes',
    route: routeRoute, // New route for routes
  },
  {
    path: '/drivers',
    route: driverRoute, // New route for drivers
  },
  {
    path: '/managers',
    route: managerRoute, // New route for drivers
  },
  {
    path: '/bus-stops',
    route: busStopsRoute, // New route for drivers
  },
  {
    path: '/scheduled-buses',
    route: scheduledBusRoute, // New route for scheduled buses
  },
  {
    path: '/maintenance',
    route: maintenanceRoute, // New route for scheduled buses
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
