const Joi = require('joi');

const createRoute = {
  body: Joi.object().keys({
    routeName: Joi.string().required(),
    origin: Joi.string().required(),
    destination: Joi.string().required(),
    totalDistance: Joi.number().required(),
    totalDuration: Joi.number().required(),
    stops: Joi.array().items(
      Joi.object().keys({
        stopId: Joi.string().required(),
        stopOrder: Joi.number().required(),
      })
    ).required(),
    routeType: Joi.string().valid('Urban', 'Suburban', 'Intercity').default('Urban'),
    isActive: Joi.boolean().default(true),
  }),
};

const updateRoute = {
  body: Joi.object().keys({
    routeName: Joi.string(),
    origin: Joi.string(),
    destination: Joi.string(),
    totalDistance: Joi.number(),
    totalDuration: Joi.number(),
    stops: Joi.array().items(
      Joi.object().keys({
        stopId: Joi.string(),
        stopOrder: Joi.number(),
      })
    ),
    routeType: Joi.string().valid('Urban', 'Suburban', 'Intercity'),
    isActive: Joi.boolean(),
    
  }),
};

module.exports = {
  createRoute,
  updateRoute,
};
