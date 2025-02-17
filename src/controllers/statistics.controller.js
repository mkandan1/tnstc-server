import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import statisticsService from '../services/statistics.service.js';

const getStatistics = catchAsync(async (req, res)=> {
    const statistics = await statisticsService.getStatistics();
    res.status(httpStatus.OK).json(statistics)
})

export default {
    getStatistics
}