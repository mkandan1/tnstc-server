const Joi = require('joi');

const createScheduledBus = {
  body: Joi.object().keys({
    bus: Joi.string().required(),
    driver: Joi.string().required(),
    route: Joi.string().required(),
    scheduleTime: Joi.date().required(),
    status: Joi.string().valid('Scheduled', 'On Route', 'Completed', 'Cancelled').default('Scheduled'),
    comments: Joi.string().default(''),
    travelTimeEstimate: Joi.number().default(0),
    realTimeTracking: Joi.boolean().default(true),
  }),
};

const updateScheduledBus = {
  body: Joi.object().keys({
    bus: Joi.string(),
    driver: Joi.string(),
    route: Joi.string(),
    scheduleTime: Joi.date(),
    status: Joi.string().valid('Scheduled', 'On Route', 'Completed', 'Cancelled'),
    comments: Joi.string(),
    travelTimeEstimate: Joi.number(),
    realTimeTracking: Joi.boolean(),
  }),
};

module.exports = {
  createScheduledBus,
  updateScheduledBus,
};
