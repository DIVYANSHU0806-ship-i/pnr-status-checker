import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import pnrRoutes from './routes/pnrRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './config/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pnr-status-checker';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error.message}`);
  }
};

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.use('/api/pnr', pnrRoutes);
app.use('/api/health', healthRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'PNR Status Checker API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      'GET /api/pnr/status/:pnrNumber': 'Check PNR status (10-digit number)',
      'GET /api/health': 'Health check',
      'GET /api/pnr/history': 'Get search history'
    },
    documentation: 'See README.md for full API documentation'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
    code: 'NOT_FOUND'
  });
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`\n🚀 PNR Status Checker API started`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
  console.log(`📖 API Docs: http://localhost:${PORT}/\n`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    mongoose.connection.close(false);
    process.exit(0);
  });
});

export default app;