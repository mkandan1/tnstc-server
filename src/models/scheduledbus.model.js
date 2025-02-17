import mongoose from 'mongoose';
import { paginate } from './plugins/index.js';
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
      ref: 'User',
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
    location: {
      latitude: {
        type: Number,
        min: -90,
        max: 90,
      },
      longitude: {
        type: Number,
        min: -180,
        max: 180,
      },
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

scheduledBusSchema.plugin(paginate);

export default mongoose.model('ScheduledBus', scheduledBusSchema);
