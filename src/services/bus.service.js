import Bus from '../models/bus.model.js';
import ApiError from '../utils/ApiError.js';

const getBuses = async () => {
  return Bus.find();
};

const getBusById = async (busId) => {
  return Bus.findById(busId)
}

const addBus = async (busData) => {
  const bus = await Bus.create(busData);
  return bus;
};

const updateBus = async (busId, busData) => {
  const bus = await Bus.findByIdAndUpdate(busId, busData, { new: true });
  if (!bus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bus not found');
  }
  return bus;
};

const deleteBus = async (busId) => {
  const bus = await Bus.findByIdAndDelete(busId);
  if (!bus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bus not found');
  }
};

export default {
  getBuses,
  addBus,
  updateBus,
  deleteBus,
  getBusById
};
