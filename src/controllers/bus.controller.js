import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { busService } from '../services/index.js';

const getBuses = catchAsync(async (req, res) => {
  const buses = await busService.getBuses();
  res.status(httpStatus.OK).send({ buses });
});

const getBus = catchAsync(async (req, res)=> {
  const bus = await busService.getBusById(req.params.id);
  res.status(httpStatus.OK).send({ bus });
})

const addBus = catchAsync(async (req, res) => {
  let busData = req.body;

  if (req.file) {
    busData.file = req.file;
  }

  if (!busData.busImage || busData.busImage === "null") {
    delete busData.busImage;
  }

  const bus = await busService.addBus(busData);
  res.status(httpStatus.CREATED).send({ bus });
});


const updateBus = catchAsync(async (req, res) => {
  delete req.body.busImage
  const bus = await busService.updateBus(req.params.id, req.body);
  res.status(httpStatus.OK).send({ bus });
});

const deleteBus = catchAsync(async (req, res) => {
  await busService.deleteBus(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  getBuses,
  addBus,
  updateBus,
  deleteBus,
  getBus
};
