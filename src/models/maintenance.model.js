const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    isMaintenance: {
      type: Boolean,
      default: false,
    },
  });

  
module.exports = mongoose.model('Maintenance', maintenanceSchema);