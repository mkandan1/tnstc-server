import { ScheduledBus, Route } from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import { calculateScheduledArrival, calculateSpeed } from '../utils/time.js'

// Create a new scheduled bus
const createScheduledBus = async (scheduledBusData) => {
  try {
    const route = await Route.findById(scheduledBusData.route);
    if (!route) {
      throw new ApiError(404, 'Route not found');
    }

    const totalDistance = route.totalDistance;
    const scheduledArrivalTime = calculateScheduledArrival(scheduledBusData.scheduleTime, totalDistance)
    scheduledBusData.scheduledArrivalTime = scheduledArrivalTime
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
      .populate('driver')
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

const querySchedules = async (filter, options) => {
  // Query schedules using pagination
  let schedules = await ScheduledBus.paginate(filter, options);

  // Populate origin and destination after querying
  schedules.results = await ScheduledBus.populate(schedules.results, {
    path: 'route.origin route.destination',
    model: 'BusStop', // Ensure 'BusStop' matches your Mongoose model name
  });

  return schedules;
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
    throw new ApiError(500, `Error deleting scheduled bus [${error.message}]`);
  }
};

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (angle) => (Math.PI / 180) * angle;
  const R = 6371; // Radius of Earth in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const updateBusLocation = async (scheduledBusId, latitude, longitude) => {
  try {
      // Fetch last location & timestamp from DB
      const scheduledBus = await ScheduledBus.findById(scheduledBusId).populate('route');
      if (!scheduledBus) throw new Error('Scheduled bus not found');

      const { location, distanceTravelled = 0, route } = scheduledBus;
      if (!route) throw new Error('Route not found');

      const prevLat = location?.latitude;
      const prevLng = location?.longitude;
      const prevTimestamp = location.lastUpdated ? new Date(location.lastUpdated).getTime() : null;

      // Calculate distance traveled since last update
      let distanceIncrement = 0;
      if (prevLat && prevLng) {
          distanceIncrement = haversineDistance(prevLat, prevLng, latitude, longitude);
      }

      const newDistanceTravelled = distanceTravelled + distanceIncrement;
      const remainingDistance = Math.max(route.totalDistance - newDistanceTravelled, 0); // Avoid negative values

      // Calculate speed
      const speed = calculateSpeed(prevLat, prevLng, prevTimestamp, latitude, longitude);

      // Calculate journey completion percentage
      const completionPercentage = ((newDistanceTravelled / route.totalDistance) * 100).toFixed(2);

      const updateFields = {
          'location.latitude': latitude,
          'location.longitude': longitude,
          'location.lastUpdated': new Date(),
          distanceTraveled: newDistanceTravelled.toFixed(2),
          distanceRemaining: remainingDistance.toFixed(2),
          journeyCompletion: completionPercentage // Store completion percentage in DB
      };

      if (speed !== null) {
          updateFields.speed = speed; // Store speed in DB
      }

      const updatedBus = await ScheduledBus.findByIdAndUpdate(
          scheduledBusId,
          { $set: updateFields },
          { new: true }
      );

      return updatedBus;
  } catch (error) {
      console.error("Error updating bus location:", error);
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
  querySchedules,
  getScheduledBusById,
  updateScheduledBus,
  deleteScheduledBus,
  updateBusLocation,
  getBusLocation
};
