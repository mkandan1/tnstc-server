const catchAsync = require('../utils/catchAsync');
const scheduledBusService = require('../services/scheduledBus.service');

// Create a new scheduled bus
const createScheduledBus = catchAsync(async (req, res) => {
  const scheduledBus = await scheduledBusService.createScheduledBus(req.body);
  res.status(201).send(scheduledBus);
});

// Get all scheduled buses
const getAllScheduledBuses = catchAsync(async (req, res) => {
  const scheduledBuses = await scheduledBusService.getAllScheduledBuses();
  res.status(200).send(scheduledBuses);
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

module.exports = {
  updateBusLocation,
  getBusLocation,
};

module.exports = {
  createScheduledBus,
  getAllScheduledBuses,
  getScheduledBusById,
  updateScheduledBus,
  deleteScheduledBus,
};
