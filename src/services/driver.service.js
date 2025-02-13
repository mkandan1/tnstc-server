const { Driver } = require('../models');
const generatePassword = require('../utils/generate');
const { sendWelcomeEmail } = require('./email.service');
const bcrypt = require('bcryptjs')

const createDriver = async (driverData) => {
  const password = generatePassword();
  driverData.password = password;
  const driver = await Driver.create(driverData);

  sendWelcomeEmail(driverData.email, password, driverData.firstName, 'Driver')
  return driver;
};

const getDriverById = async (id) => {
  const driver = await Driver.findById(id).select('-password');
  return driver;
};

const getDriverByEmail = async (email) => {
  return Driver.findOne({ email });
};

const getAllDrivers = async () => {
  const drivers = await Driver.find();
  return drivers;
};

const updateDriver = async (id, driverData) => {
  const driver = await Driver.findByIdAndUpdate(id, driverData, { new: true });
  return driver;
};

const deleteDriver = async (id) => {
  const driver = await Driver.findByIdAndDelete(id);
  return driver;
};

/**
 * Login a driver with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Driver>}
 */

module.exports = {
  createDriver,
  getDriverById,
  getAllDrivers,
  updateDriver,
  deleteDriver,
  getDriverByEmail
};
