import express from 'express';
import {
  getAllProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getTopProperties,
  getHostProperties,
} from '../controllers/propertyController.js';
import { protect, restrictTo } from '../controllers/authController.js';
import reviewRouter from './reviews.js';

const router = express.Router();

// Nested route for reviews
router.use('/:propertyId/reviews', reviewRouter);

// Public routes
router.get('/top', getTopProperties, getAllProperties);
router.get('/', getAllProperties);
router.get('/:id', getProperty);

// Protected routes
router.use(protect);

// Host routes
router.get('/host/properties', getHostProperties);

// Create property (any authenticated user can create a property)
router.post('/', createProperty);

// Update and delete property (only property host or admin)
router.route('/:id')
  .patch(updateProperty)
  .delete(deleteProperty);

export default router;