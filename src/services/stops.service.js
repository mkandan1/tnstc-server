const { BusStop } = require('../models');
const ApiError = require('../utils/ApiError');

const getBusStops = async () => {
  return BusStop.find();
};

const getBusStopById = async (id) => {
  const busStop = await BusStop.findById(id);
  if (!busStop) throw new ApiError(404, "Bus Stop not found");
  return busStop;
};

const addBusStop = async (data) => {
  return await BusStop.create(data);
};

const updateBusStop = async (id, data) => {
  const busStop = await BusStop.findByIdAndUpdate(id, data, { new: true });
  if (!busStop) throw new ApiError(404, "Bus Stop not found");
  return busStop;
};

const deleteBusStop = async (id) => {
  const busStop = await BusStop.findByIdAndDelete(id);
  if (!busStop) throw new ApiError(404, "Bus Stop not found");
};

module.exports = {
  getBusStops,
  getBusStopById,
  addBusStop,
  updateBusStop,
  deleteBusStop
};
