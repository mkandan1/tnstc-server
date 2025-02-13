const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduledBusSchema = new Schema(
  {
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route',
      required: true,
    },
    scheduleTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Scheduled', 'On Route', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
    comments: {
      type: String,
      default: '',
    },
    travelTimeEstimate: {
      type: Number,
      default: 0,
    },
    realTimeTracking: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ScheduledBus', scheduledBusSchema);
