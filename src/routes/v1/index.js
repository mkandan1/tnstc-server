import express from 'express';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';
import busRoute from './bus.route.js';
import routeRoute from './route.route.js';
import driverRoute from './driver.route.js';
import scheduledBusRoute from './scheduledBus.route.js';
import maintenanceRoute from './maintenance.route.js';
import busStopsRoute from './stops.route.js';
import docsRoute from './docs.route.js';
import statisticsRoute from './statistics.route.js';
import config from '../../config/config.js';

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
    route: busRoute,
  },
  {
    path: '/routes',
    route: routeRoute,
  },
  {
    path: '/drivers',
    route: driverRoute,
  },
  {
    path: '/bus-stops',
    route: busStopsRoute,
  },
  {
    path: '/scheduled-buses',
    route: scheduledBusRoute,
  },
  {
    path: '/maintenance',
    route: maintenanceRoute,
  },
  
  {
    path: '/statistics',
    route: statisticsRoute,
  },
];

const devRoutes = [
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
export default router;
