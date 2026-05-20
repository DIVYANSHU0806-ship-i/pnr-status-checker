import axios from 'axios';
import logger from '../config/logger.js';

const IRCTC_API_URL = process.env.IRCTC_API_URL || 'https://api.irctc.co.in/v1';
const IRCTC_API_KEY = process.env.IRCTC_API_KEY;
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true';

const MOCK_PNR_DATA = {
  '1234567890': {
    status: 'CNF',
    passengers: [{ name: 'John Doe', age: 30, gender: 'M', seat: '2A', coachId: 'A2' }],
    trainDetails: { trainNumber: '12345', trainName: 'Express Train', boardingStation: 'New Delhi', destination: 'Mumbai', journeyDate: '2024-06-15', reservationClass: '2A', departureTime: '22:00', arrivalTime: '08:00' },
    bookingDetails: { bookingStatus: 'Confirmed', bookingDate: '2024-05-15', totalFare: 2500, paymentMode: 'Credit Card' }
  },
  '9876543210': {
    status: 'RAC',
    passengers: [{ name: 'Alice Smith', age: 35, gender: 'F', seat: 'RAC-1', coachId: 'A5' }],
    trainDetails: { trainNumber: '54321', trainName: 'Rajdhani Express', boardingStation: 'Mumbai', destination: 'Delhi', journeyDate: '2024-06-20', reservationClass: '1A', departureTime: '14:30', arrivalTime: '06:30' },
    bookingDetails: { bookingStatus: 'RAC', bookingDate: '2024-05-10', totalFare: 5000, paymentMode: 'UPI' }
  },
  '5555555555': {
    status: 'WL',
    passengers: [{ name: 'Bob Johnson', age: 45, gender: 'M', seat: 'WL-15', coachId: null }],
    trainDetails: { trainNumber: '11111', trainName: 'Shatabdi Express', boardingStation: 'Bangalore', destination: 'Chennai', journeyDate: '2024-06-10', reservationClass: '2A', departureTime: '06:00', arrivalTime: '11:00' },
    bookingDetails: { bookingStatus: 'Waiting List', bookingDate: '2024-05-20', totalFare: 1200, paymentMode: 'Net Banking' }
  }
};

export const getPNRFromIRCTC = async (pnrNumber) => {
  try {
    if (USE_MOCK_DATA || !IRCTC_API_KEY) {
      logger.info(`Using mock data for PNR: ${pnrNumber}`);
      if (MOCK_PNR_DATA[pnrNumber]) {
        return {
          ...MOCK_PNR_DATA[pnrNumber],
          lastUpdated: new Date().toISOString(),
          isMockData: true,
          message: 'Using mock data - configure IRCTC API key for real data'
        };
      }
      return {
        status: 'NOTFOUND',
        message: 'PNR not found in test data. Use one of the test PNRs: 1234567890, 9876543210, 5555555555',
        isMockData: true
      };
    }

    const response = await axios.get(`${IRCTC_API_URL}/pnr/${pnrNumber}`, {
      headers: { 'Authorization': `Bearer ${IRCTC_API_KEY}` },
      timeout: 10000
    });

    return { ...response.data, isMockData: false, lastUpdated: new Date().toISOString() };
  } catch (error) {
    logger.error(`IRCTC API error: ${error.message}`);
    throw new Error(`Failed to fetch PNR status: ${error.message}`);
  }
};

export const formatPNRResponse = (data) => {
  return {
    status: data.status || 'UNKNOWN',
    passengers: data.passengers || [],
    trainDetails: data.trainDetails || {},
    bookingDetails: data.bookingDetails || {},
    lastUpdated: data.lastUpdated
  };
};