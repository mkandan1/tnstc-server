import mongoose from 'mongoose';
import app from './app.js';
import config from './config/config.js';
import logger from './config/logger.js';

let isConnected = false; // Ensure MongoDB only connects once
let server = null;

// Function to connect to MongoDB
async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    logger.info('Connected to MongoDB');
    isConnected = true;
  }
}

// Local development: Start Express server
if (process.env.NODE_ENV !== 'vercel') {
  connectDB().then(() => {
    server = app.listen(config.port, () => {
      logger.info(`Listening on port ${config.port}`);
    });
  });
}

// Graceful shutdown handlers
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

// ✅ Vercel: Export a request handler instead of app.listen()
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
