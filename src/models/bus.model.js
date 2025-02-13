const mongoose = require('mongoose');
const { Schema } = mongoose;

const busSchema = new Schema(
  {
    busNumber : {
      type: String,
      required: true
    },
    isAc: {
      type: Boolean,
      default: false,
    },
    isLowFloor: {
      type: Boolean,
      default: false,
    },
    passengerType: {
      type: String,
      enum: ['Regular', 'Senior Citizen', 'Student', 'Differently-Abled'],
      default: 'Regular',
    },
    specialService: {
      type: Boolean,
      default: false,
    },
    routeCode: {
      type: String,
      default: '',
    },
    lastMaintenanceDate: {
      type: Date,
    },
    isNightService: {
      type: Boolean,
      default: false,
    },
    passengerCapacity: {
      type: Number,
      required: true,
    },
    busType: {
      type: String,
      enum: ['City', 'Intercity', 'Suburban', 'Special'],
      default: 'City',
    },
    operationalArea: {
      type: String,
      required: true,
    },
    specialFares: [
      {
        fareType: String,
        fareAmount: Number,
        applicableDates: [Date],
      },
    ],
    fuelType: {
      type: String,
      enum: ['Diesel', 'CNG', 'Electric', 'Hybrid'],
      default: 'Diesel',
    },
    emergencyContact: {
      type: String,
      default: '',
    },
    passengerFeedback: [
      {
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comments: String,
        date: Date,
      },
    ],
    busAmenities: [
      {
        amenity: String,
        description: String,
      },
    ],
    ticketingSystem: {
      type: String,
      enum: ['Manual', 'Online', 'Both'],
      default: 'Manual',
    },
    travelClasses: [
      {
        className: String,
        amenities: [String],
      },
    ],
    liveTrackingUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Bus', busSchema);
