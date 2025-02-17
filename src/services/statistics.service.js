import { User, Bus, BusStop, Route, ScheduledBus } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

const getStatistics = async () => {
    try {
        // Fetching counts for users, buses, bus stops, and routes
        const user = await User.find();
        const buses = await Bus.find();
        const busstop = await BusStop.find();
        const route = await Route.find();
        
        // Fetching scheduled buses with status "on Route"
        const scheduledbusesOnRoute = await ScheduledBus.find({ status: 'on Route' });
        
        // Constructing the statistics data
        const data = {
            user: user.length,               // Count of users
            buses: buses.length,             // Count of buses
            busStops: busstop.length,        // Count of bus stops
            routes: route.length,            // Count of routes
            onLive: scheduledbusesOnRoute.length // Count of buses with status 'on Route'
        };

        return data; // Return the statistics object
    } catch (error) {
        throw new ApiError(500, 'Error fetching statistics');
    }
};

export default {getStatistics};
