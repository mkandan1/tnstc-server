import bcrypt from 'bcryptjs';
import { Manager } from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import generatePassword from '../utils/generate.js';
import emailService from './email.service.js'

// Login manager
const loginManager = async (email, password) => {
  const manager = await Manager.findOne({ email });
  if (!manager || !(await bcrypt.compare(password, manager.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }
  return manager;
};

const getManagerByEmail = async (email) => {
  return Manager.findOne({ email });
};

// Create a new manager
const createManager = async (managerBody) => {
  const existingManager = await Manager.findOne({ email: managerBody.email });
  if (existingManager) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Manager with this email already exists');
  }
  const password = generatePassword();
  managerBody.password = password
  const manager = await Manager.create(managerBody);
  emailService.sendWelcomeEmail(managerBody.email, password, managerBody.firstName, 'Manager')
  return manager;
};

// Get a manager by ID
const getManagerById = async (id) => {
  return Manager.findById(id).select('-password');
};

// Update manager by ID
const updateManager = async (id, updateBody) => {
  const manager = await Manager.findByIdAndUpdate(id, updateBody, { new: true });
  if (!manager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Manager not found');
  }
  return manager;
};

// Delete a manager by ID
const deleteManager = async (id) => {
  const manager = await Manager.findByIdAndDelete(id);
  if (!manager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Manager not found');
  }
};

// Get all managers
const getAllManagers = async () => {
  return Manager.find();
};

/**
 * Login a driver with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Driver>}
 */
const loginManagerWithEmailAndPassword = async (email, password) => {
  const driver = await Manager.findOne({ email });  // Find driver by email
  if (!driver) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  const isPasswordMatch = await bcrypt.compare(password, driver.password);  // Check password match
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return driver;
};

export default {
  createManager,
  getManagerById,
  updateManager,
  deleteManager,
  getAllManagers,
  getManagerByEmail,
  loginManagerWithEmailAndPassword
};
