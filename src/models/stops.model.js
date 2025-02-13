const mongoose = require('mongoose');

const busStopSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  active: { type: Boolean, default: true }
}, {timestamps: true});

const BusStop = mongoose.model('BusStop', busStopSchema);
module.exports = BusStop;
