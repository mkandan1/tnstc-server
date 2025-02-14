import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { busStopService } from '../services/index.js';

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

export default {
  getBusStops,
  getBusStopById,
  addBusStop,
  updateBusStop,
  deleteBusStop
};
