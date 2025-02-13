const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const createManager = catchAsync(async (req, res) => {
  const manager = await managerService.createManager(req.body);
  res.status(httpStatus.CREATED).send(manager);
});

// Get manager by ID
const getManagerById = catchAsync(async (req, res) => {
  const manager = await managerService.getManagerById(req.params.id);
  if (!manager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Manager not found');
  }
  res.status(httpStatus.OK).send(manager);
});

// Update manager details
const updateManager = catchAsync(async (req, res) => {
  const updatedManager = await managerService.updateManager(req.params.id, req.body);
  if (!updatedManager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Manager not found');
  }
  res.status(httpStatus.OK).send(updatedManager);
});

// Delete a manager
const deleteManager = catchAsync(async (req, res) => {
  await managerService.deleteManager(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

// Get all managers
const getAllManagers = catchAsync(async (req, res) => {
  const managers = await managerService.getAllManagers();
  res.status(httpStatus.OK).send(managers);
});

module.exports = {
  createManager,
  getManagerById,
  updateManager,
  deleteManager,
  getAllManagers,
};
