import mongoose from 'mongoose';
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
    realTimeTracking: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('ScheduledBus', scheduledBusSchema);
