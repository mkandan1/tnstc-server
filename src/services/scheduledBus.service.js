import { ScheduledBus } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

// Create a new scheduled bus
const createScheduledBus = async (scheduledBusData) => {
  try {
    const scheduledBus = new ScheduledBus(scheduledBusData);
    await scheduledBus.save();
    return scheduledBus;
  } catch (error) {
    throw new ApiError(500, 'Error creating scheduled bus');
  }
};

// Get all scheduled buses
const getAllScheduledBuses = async () => {
  try {
    return await ScheduledBus.find()
      .populate('driver') // Populate the driver information
      .populate('route') // Populate the route information
      .populate('bus'); // Populate the bus information
  } catch (error) {
    throw new ApiError(500, 'Error fetching scheduled buses');
  }
};

// Get a scheduled bus by ID
const getScheduledBusById = async (id) => {
  try {
    const scheduledBus = await ScheduledBus.findById(id)
      .populate('driver')
      .populate('route')
      .populate('bus');
    if (!scheduledBus) {
      throw new ApiError(404, 'Scheduled bus not found');
    }
    return scheduledBus;
  } catch (error) {
    throw new ApiError(500, 'Error fetching scheduled bus');
  }
};

// Update a scheduled bus
const updateScheduledBus = async (id, updateData) => {
  try {
    const scheduledBus = await ScheduledBus.findByIdAndUpdate(id, updateData, { new: true });
    if (!scheduledBus) {
      throw new ApiError(404, 'Scheduled bus not found');
    }
    return scheduledBus;
  } catch (error) {
    throw new ApiError(500, 'Error updating scheduled bus');
  }
};

// Delete a scheduled bus
const deleteScheduledBus = async (id) => {
  try {
    const scheduledBus = await ScheduledBus.findByIdAndDelete(id);
    if (!scheduledBus) {
      throw new ApiError(404, 'Scheduled bus not found');
    }
    return scheduledBus;
  } catch (error) {
    throw new ApiError(500, 'Error deleting scheduled bus');
  }
};

const updateBusLocation = async (scheduledBusId, latitude, longitude) => {
  try {
    const scheduledBus = await ScheduledBus.findByIdAndUpdate(
      scheduledBusId,
      {
        $set: {
          'location.latitude': latitude,
          'location.longitude': longitude,
          lastUpdated: Date.now(),
        },
      },
      { new: true }
    );
    if (!scheduledBus) {
      throw new Error('Scheduled bus not found');
    }
    return scheduledBus;
  } catch (error) {
    throw new Error('Error updating bus location');
  }
};

const getBusLocation = async (scheduledBusId) => {
  try {
    const scheduledBus = await ScheduledBus.findById(scheduledBusId);
    if (!scheduledBus) {
      throw new Error('Scheduled bus not found');
    }
    return scheduledBus;
  } catch (error) {
    throw new Error('Error fetching bus location');
  }
};

export default {
  createScheduledBus,
  getAllScheduledBuses,
  getScheduledBusById,
  updateScheduledBus,
  deleteScheduledBus,
  updateBusLocation,
  getBusLocation
};
