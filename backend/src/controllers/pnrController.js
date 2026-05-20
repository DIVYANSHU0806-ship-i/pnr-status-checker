import { getPNRFromIRCTC, formatPNRResponse } from '../services/irctcService.js';
import logger from '../config/logger.js';

export const getPNRStatus = async (req, res, next) => {
  const startTime = Date.now();
  const { pnrNumber } = req.params;
  
  try {
    logger.info(`PNR Status request: ${pnrNumber}`);
    const pnrData = await getPNRFromIRCTC(pnrNumber);
    
    return res.json({
      success: true,
      data: formatPNRResponse(pnrData),
      source: pnrData.isMockData ? 'mock-data' : 'irctc-api',
      timestamp: new Date().toISOString(),
      responseTime: `${Date.now() - startTime}ms`
    });
  } catch (error) {
    logger.error(`Error in getPNRStatus: ${error.message}`);
    next(error);
  }
};

export default { getPNRStatus };