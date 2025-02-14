import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
    isMaintenance: {
      type: Boolean,
      default: false,
    },
  });

  
export default mongoose.model('Maintenance', maintenanceSchema);