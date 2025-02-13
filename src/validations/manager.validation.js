const Joi = require('joi');

const managerValidation = {
  // Create Manager
  createManager: Joi.object({
    firstName: Joi.string().required().min(2).max(50).trim(),
    lastName: Joi.string().required().min(2).max(50).trim(),
    contactNumber: Joi.string().required().length(10).pattern(/^[0-9]+$/).message('Contact number must be exactly 10 digits.'),
    email: Joi.string().required().email().trim(),
    address: Joi.string().optional().allow(''),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    emergencyContact: Joi.object({
      name: Joi.string().optional(),
      contactNumber: Joi.string().optional(),
    }).optional(),
    profilePicture: Joi.string().optional(),
    permissions: Joi.array().items(Joi.string().valid(
      'viewRoute', 
      'viewScheduledBus', 
      'updateLocation', 
      'viewAssignedBus', 
      'viewProfile', 
      'updateProfile',
      'manageDrivers',
      'manageRoutes',
      'manageDrivers',
      'manageScheduleBus',
    )).optional(),
  }),

  // Update Manager
  updateManager: Joi.object({
    firstName: Joi.string().min(2).max(50).trim().optional(),
    lastName: Joi.string().min(2).max(50).trim().optional(),
    contactNumber: Joi.string().length(10).pattern(/^[0-9]+$/).message('Contact number must be exactly 10 digits.').optional(),
    email: Joi.string().email().trim().optional(),
    address: Joi.string().allow('').optional(),
    dateOfBirth: Joi.date().optional(),
    isActive: Joi.boolean().optional(),
    gender: Joi.string().valid('Male', 'Female', 'Other').optional(),
    emergencyContact: Joi.object({
      name: Joi.string().optional(),
      contactNumber: Joi.string().optional(),
    }).optional(),
    profilePicture: Joi.string().optional(),
    permissions: Joi.array().items(Joi.string().valid(
      'viewRoute', 
      'viewScheduledBus', 
      'updateLocation', 
      'viewAssignedBus', 
      'viewProfile', 
      'updateProfile',
      'manageDrivers',
      'manageRoutes',
      'manageDrivers',
      'manageScheduleBus',
    )).optional(),
  }),

  // Login Manager
  loginManager: Joi.object({
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(8),
  }),

  // Validate Permissions
  validatePermissions: (permissions) => {
    const schema = Joi.array().items(Joi.string().valid(
      'viewRoute', 
      'viewScheduledBus', 
      'updateLocation', 
      'viewAssignedBus', 
      'viewProfile', 
      'updateProfile',
      'manageDrivers',
      'manageRoutes',
      'manageDrivers',
      'manageScheduleBus',
    ));
    return schema.validate(permissions);
  },
};

module.exports = managerValidation;
