const Joi = require('joi');

// Shared validation rules
const busNumber = Joi.string().required();
const busType = Joi.string().valid('City', 'Intercity', 'Suburban', 'Special').required();
const route = Joi.string().optional();
const status = Joi.string().valid('Active', 'Inactive').default('Active');
const lastMaintenance = Joi.date().optional();

// Boolean fields
const isAc = Joi.boolean().optional();
const isLowFloor = Joi.boolean().optional();
const specialService = Joi.boolean().optional();
const isNightService = Joi.boolean().optional();

// Passenger details
const passengerCapacity = Joi.number().integer().min(1).required();
const passengerType = Joi.string().valid('Regular', 'Senior Citizen', 'Student', 'Differently-Abled').default('Regular');

// Fuel and maintenance
const fuelType = Joi.string().valid('Diesel', 'CNG', 'Electric', 'Hybrid').default('Diesel');
const emergencyContact = Joi.string().optional();

// Fare, feedback, and amenities
const specialFares = Joi.array().items(
  Joi.object({
    fareType: Joi.string().optional(),
    fareAmount: Joi.number().optional(),
    applicableDates: Joi.array().items(Joi.date()).optional(),
  })
).optional();

const passengerFeedback = Joi.array().items(
  Joi.object({
    rating: Joi.number().min(1).max(5).optional(),
    comments: Joi.string().optional(),
    date: Joi.date().optional(),
  })
).optional();

const busAmenities = Joi.array().items(
  Joi.object({
    amenity: Joi.string().optional(),
    description: Joi.string().optional(),
  })
).optional();

// Ticketing and class details
const ticketingSystem = Joi.string().valid('Manual', 'Online', 'Both').default('Manual');
const travelClasses = Joi.array().items(
  Joi.object({
    className: Joi.string().optional(),
    amenities: Joi.array().items(Joi.string()).optional(),
  })
).optional();

// Tracking URL
const liveTrackingUrl = Joi.string().uri().optional();
const operationalArea = Joi.string().optional();

// Schema for creating a bus
const createBus = {
  body: Joi.object().keys({
    busNumber,
    busType,
    passengerCapacity,
    route,
    status,
    lastMaintenance,
    isAc,
    isLowFloor,
    passengerType,
    specialService,
    fuelType,
    emergencyContact,
    specialFares,
    passengerFeedback,
    busAmenities,
    ticketingSystem,
    travelClasses,
    liveTrackingUrl,
    lastMaintenanceDate: Joi.date().optional(),
    isNightService,
    operationalArea
  }),
};

// Schema for updating a bus
const updateBus = {
  body: Joi.object().keys({
    busNumber: Joi.string().optional(),
    busType: Joi.string().valid('City', 'Intercity', 'Suburban', 'Special').optional(),
    passengerCapacity: Joi.number().integer().min(1).optional(),
    route: Joi.string().optional(),
    status: Joi.string().valid('Active', 'Inactive').optional(),
    lastMaintenance: Joi.date().optional(),
    isAc,
    isLowFloor,
    lastMaintenanceDate: Joi.date().optional(),
    isNightService,
    passengerType: Joi.string().valid('Regular', 'Senior Citizen', 'Student', 'Differently-Abled').optional(),
    specialService,
    fuelType,
    emergencyContact,
    specialFares,
    passengerFeedback,
    busAmenities,
    ticketingSystem,
    travelClasses,
    liveTrackingUrl,
    operationalArea
  }),
};

module.exports = {
  createBus,
  updateBus,
};
