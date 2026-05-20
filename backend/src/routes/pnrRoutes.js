import express from 'express';
import { getPNRStatus } from '../controllers/pnrController.js';

const router = express.Router();

router.get('/status/:pnrNumber', getPNRStatus);

export default router;