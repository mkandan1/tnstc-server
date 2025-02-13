const Joi = require('joi');

const busStopName = Joi.string().required();
const latitude = Joi.number().required();
const longitude = Joi.number().required();
const active = Joi.boolean().default(true);

// Schema for creating a bus stop
const createBusStop = {
  body: Joi.object().keys({
    name: busStopName,
    coordinates: Joi.object().keys({
      lat: latitude,
      lng: longitude
    }),
    active
  }),
};

// Schema for updating a bus stop
const updateBusStop = {
  body: Joi.object().keys({
    name: Joi.string().optional(),
    coordinates: Joi.object().keys({
      lat: Joi.number().optional(),
      lng: Joi.number().optional()
    }),
    active: Joi.boolean().optional()
  }),
};

module.exports = {
  createBusStop,
  updateBusStop,
};
