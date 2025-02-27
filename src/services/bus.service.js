import Bus from '../models/bus.model.js';
import ApiError from '../utils/ApiError.js';
import { deleteObjectFromS3 } from '../utils/deleteObjectFromS3.js';

const getBuses = async () => {
  return Bus.find();
};

const getBusById = async (busId) => {
  return Bus.findById(busId)
}

const addBus = async (busData) => {
  if (busData.file) {
    busData.busImage = busData.file.location;
    delete busData.file;
  } else if (!busData.busImage) {
    delete busData.busImage;
  }

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
  const bus = await Bus.findById(busId);
  if (!bus) {
    throw new ApiError(httpStatus.NOT_FOUND, "Bus not found");
  }

  const defaultImageUrl = "https://tnstc.s3.ap-south-1.amazonaws.com/uploads/buses/default.jpg";

  if (bus.busImage && bus.busImage !== defaultImageUrl) {
    const imageKey = new URL(bus.busImage).pathname.substring(1);
    await deleteObjectFromS3(imageKey);
  }

  await Bus.findByIdAndDelete(busId);
};




export default {
  getBuses,
  addBus,
  updateBus,
  deleteBus,
  getBusById
};
