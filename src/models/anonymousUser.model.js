import mongoose from "mongoose";

const AnonymousUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: function () {
        return `Guest_${Math.floor(1000 + Math.random() * 9000)}`; // Random guest username
      },
      unique: true,
    },
    role: {
      type: String,
      default: 'anonymous', // Assigning a guest role
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const AnonymousUser = mongoose.model('AnonymousUser', AnonymousUserSchema);
export default AnonymousUser;
