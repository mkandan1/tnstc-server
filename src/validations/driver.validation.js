const Joi = require('joi');

const createDriver = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    contactNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    dateOfBirth: Joi.date().required(),
    licenseNumber: Joi.string().required(),
    isActive: Joi.boolean().default(true),
    address: Joi.string(),
    profilePicture: Joi.string(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    permissions: Joi.array(),
    emergencyContact: Joi.object().keys({
      name: Joi.string().required(),
      contactNumber: Joi.string().required(),
    }).required(),
    drivingExperience: Joi.number().min(1).required(),
    vehicleTypes: Joi.array().items(Joi.string().valid('Bus', 'Minibus', 'Car', 'Two Wheeler')).required(),
  }),
};

const loginDriver = {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),  // You can adjust the minimum length based on your requirements
    }),
  };

const updateDriver = {
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    contactNumber: Joi.string(),
    email: Joi.string().email(),
    dateOfBirth: Joi.date(),
    licenseNumber: Joi.string(),
    isActive: Joi.boolean(),
    address: Joi.string(),
    gender: Joi.string().valid('Male', 'Female', 'Other'),
    permissions: Joi.array(),
    assignedBuses: Joi.array().optional(),
    role: Joi.string().optional(),
    _id: Joi.string().optional(),
    ratings: Joi.array().optional(),
    __v: Joi.optional(),
    profilePicture: Joi.string(),
    emergencyContact: Joi.object().keys({
      name: Joi.string(),
      contactNumber: Joi.string(),
    }),
    drivingExperience: Joi.number().min(1),
    vehicleTypes: Joi.array().items(Joi.string().valid('Bus', 'Minibus', 'Car', 'Two Wheeler')),
  }),
};

module.exports = {
  createDriver,
  updateDriver,
  loginDriver
};
