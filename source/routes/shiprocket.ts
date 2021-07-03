import express from 'express';
import ShiprocketController from '../controllers/shiprocket-controller';
import Middleware from '../middleware';

const router = express.Router();

router.post('/token', Middleware.handleValidationError, ShiprocketController.authToken);
router.post('/createOrder', Middleware.handleValidationError, ShiprocketController.createAdhocOrder);

export = router;