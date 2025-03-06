import mongoose from 'mongoose';

const busStopSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const BusStop = mongoose.model('BusStop', busStopSchema);
BusStop.syncIndexes();
export default BusStop;
