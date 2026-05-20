import mongoose from 'mongoose';

const pnrCacheSchema = new mongoose.Schema({
  pnrNumber: { type: String, required: true, unique: true, index: true },
  data: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 5 * 60 * 1000), index: true }
});

pnrCacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const searchHistorySchema = new mongoose.Schema({
  pnrNumber: { type: String, required: true, index: true },
  status: String,
  searchedAt: { type: Date, default: Date.now, index: true },
  responseTime: Number,
  ipAddress: String,
  userAgent: String
});

const apiLogSchema = new mongoose.Schema({
  pnrNumber: String,
  endpoint: String,
  method: String,
  statusCode: Number,
  responseTime: Number,
  errorMessage: String,
  ipAddress: String,
  timestamp: { type: Date, default: Date.now, index: true }
});

export const PNRCache = mongoose.model('PNRCache', pnrCacheSchema);
export const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);
export const APILog = mongoose.model('APILog', apiLogSchema);