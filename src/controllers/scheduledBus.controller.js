import catchAsync from '../utils/catchAsync.js';
import { scheduledBusService } from '../services/index.js';
import pick from '../utils/pick.js';

// Create a new scheduled bus
const createScheduledBus = catchAsync(async (req, res) => {
  const scheduledBus = await scheduledBusService.createScheduledBus(req.body);
  res.status(201).send(scheduledBus);
});

const getAllScheduledBuses = catchAsync(async (req, res) => {
  // Log the filter query from the request
  const filter = pick(req.query, ['driver']);
  const { busStop, status } = req.query;

  // Options for pagination and data population
  const options = {
    page: 1,
    limit: 10,
    sortBy: 'createdAt:asc',
    populate: 'driver,route,bus,route.stops.stopId', // Ensure stops are populated correctly
  };

  let schedules = await scheduledBusService.querySchedules(filter, options);



  if (busStop) {
    schedules = schedules.results.filter((schedule) => {
      const stopMatches = schedule.route.stops.some((stop) =>
        stop.stopId._id.toString() === busStop
      );
      return stopMatches;
    });
  }

  if (status && status.length > 0) {
    schedules = schedules.filter((schedule) => status.includes(schedule.status));
  }

  if (schedules.length === 0) {
    console.log('No scheduled buses found for the provided bus stop or status.');
  }

  res.send(schedules);
});


// Get a scheduled bus by ID
const getScheduledBusById = catchAsync(async (req, res) => {
  const scheduledBus = await scheduledBusService.getScheduledBusById(req.params.id);
  res.status(200).send(scheduledBus);
});

// Update a scheduled bus
const updateScheduledBus = catchAsync(async (req, res) => {
  const scheduledBus = await scheduledBusService.updateScheduledBus(req.params.id, req.body);
  res.status(200).send(scheduledBus);
});

// Delete a scheduled bus
const deleteScheduledBus = catchAsync(async (req, res) => {
  await scheduledBusService.deleteScheduledBus(req.params.id);
  res.status(204).send();
});

// Controller for starting the ride
const startRide = catchAsync(async (req, res) => {
  const { latitude, longitude } = req.body;
  const { id } = req.params;

  const scheduledBus = await scheduledBusService.getScheduledBusById(id);
  if (!scheduledBus) {
    return res.status(404).send({ message: 'Scheduled bus not found' });
  }

  scheduledBus.status = 'On Route';

  // Update the location of the bus
  scheduledBus.location = { latitude, longitude };
  await scheduledBus.save();

  res.status(200).send(scheduledBus);
});

const completeRide = catchAsync(async (req, res) => {
  const { id } = req.params;

  const scheduledBus = await scheduledBusService.getScheduledBusById(id);
  if (!scheduledBus) {
    return res.status(404).send({ message: 'Scheduled bus not found' });
  }

  scheduledBus.status = 'Completed';
  scheduledBus.location = { latitude: null, longitude: null }
  await scheduledBus.save();

  res.status(200).send(scheduledBus);
});



// Controller for updating the bus location
const updateBusLocation = async (req, res) => {
  const { latitude, longitude } = req.body;
  const scheduledBusId = req.params.id;

  try {
    const updatedScheduledBus = await scheduledBusService.updateBusLocation(
      scheduledBusId,
      latitude,
      longitude
    );
    res.status(200).send(updatedScheduledBus);
  } catch (error) {
    res.status(500).send({ message: 'Error updating bus location', error: error.message });
  }
};

// Controller for retrieving bus location
const getBusLocation = async (req, res) => {
  const scheduledBusId = req.params.id;

  try {
    const scheduledBus = await scheduledBusService.getBusLocation(scheduledBusId);
    if (!scheduledBus) {
      return res.status(404).send({ message: 'Scheduled bus not found' });
    }
    res.status(200).send(scheduledBus.location);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching bus location', error: error.message });
  }
};

export default {
  createScheduledBus,
  getAllScheduledBuses,
  getScheduledBusById,
  updateScheduledBus,
  deleteScheduledBus,
  updateBusLocation,
  getBusLocation,
  startRide,
  completeRide
};
