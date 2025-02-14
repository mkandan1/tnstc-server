import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcryptjs'

const managerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: 'manager',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    emergencyContact: {
      name: String,
      contactNumber: String,
    },
    profilePicture: {
      type: String,
      default: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'
    },
    permissions: [
      {
        type: String,
        enum: [
          'viewRoute', 
          'viewScheduledBus', 
          'updateLocation', 
          'viewAssignedBus', 
          'viewProfile', 
          'updateProfile',
          'manageDrivers',
          'manageRoutes',
          'manageScheduleBus',
        ],
        default: [
          'viewRoute', 
          'viewScheduledBus', 
          'updateLocation', 
          'viewAssignedBus', 
          'viewProfile', 
          'updateProfile',
          'manageDrivers',
          'manageRoutes',
          'manageScheduleBus',
        ]
      }
    ],
  },
  {
    timestamps: true,
  }
);

managerSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

managerSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};


export default mongoose.model('Manager', managerSchema);
