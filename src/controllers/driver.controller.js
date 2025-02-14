import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { driverService } from '../services/index.js';
import ApiError from '../utils/ApiError.js';

const addDriver = catchAsync(async (req, res) => {
  const driver = await driverService.createDriver(req.body);
  res.status(httpStatus.CREATED).send(driver);
});

// Get a driver by ID
const getDriver = catchAsync(async (req, res) => {
  const driver = await driverService.getDriverById(req.params.id);
  if (!driver) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Driver not found');
  }
  res.status(httpStatus.OK).send(driver);
});

// Get all drivers
const getAllDrivers = catchAsync(async (req, res) => {
  const drivers = await driverService.getAllDrivers();
  res.status(httpStatus.OK).send(drivers);
});

// Update driver details
const updateDriver = catchAsync(async (req, res) => {
  const driver = await driverService.updateDriver(req.params.id, req.body);
  if (!driver) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Driver not found');
  }
  res.status(httpStatus.OK).send(driver);
});

// Delete a driver
const deleteDriver = catchAsync(async (req, res) => {
  const driver = await driverService.deleteDriver(req.params.id);
  if (!driver) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Driver not found');
  }
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  addDriver,
  getDriver,
  getAllDrivers,
  updateDriver,
  deleteDriver,
};
