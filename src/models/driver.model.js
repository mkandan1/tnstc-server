import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcryptjs'

const driverSchema = new Schema(
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
      default: 'driver'
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
    licenseNumber: {
      type: String,
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
    drivingExperience: {
      type: Number,
      required: true,
    },
    vehicleTypes: [
      {
        type: String,
        enum: ['Bus', 'Minibus', 'Car', 'Two Wheeler'],
      },
    ],
    assignedBuses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
      },
    ],
    profilePicture: {
      type: String,
      default: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'
    },
    ratings: [
      {
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comments: String,
        date: Date,
      },
    ],
    permissions: [
      {
        type: String,
        enum: [
          'viewRoute', 
          'viewScheduledBus', 
          'updateLocation', 
          'viewAssignedBus', 
          'viewProfile', 
          'updateProfile'
        ],
      }
    ],
  },
  {
    timestamps: true,
  }
);

driverSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);  // Hash the password before saving
  }
  next();
});

driverSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('Driver', driverSchema);
