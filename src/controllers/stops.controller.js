const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { busStopService } = require('../services');

const getBusStops = catchAsync(async (req, res) => {
  const busStops = await busStopService.getBusStops();
  res.status(httpStatus.OK).send({ busStops });
});

const getBusStopById = catchAsync(async (req, res) => {
  const busStop = await busStopService.getBusStopById(req.params.id);
  res.status(httpStatus.OK).send({ busStop });
});

const addBusStop = catchAsync(async (req, res) => {
  const busStop = await busStopService.addBusStop(req.body);
  res.status(httpStatus.CREATED).send({ busStop });
});

const updateBusStop = catchAsync(async (req, res) => {
  const busStop = await busStopService.updateBusStop(req.params.id, req.body);
  res.status(httpStatus.OK).send({ busStop });
});

const deleteBusStop = catchAsync(async (req, res) => {
  await busStopService.deleteBusStop(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getBusStops,
  getBusStopById,
  addBusStop,
  updateBusStop,
  deleteBusStop
};
