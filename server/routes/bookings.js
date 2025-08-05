import express from 'express';
import {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
  getUserBookings,
  getHostBookings,
} from '../controllers/bookingController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

// All booking routes require authentication
router.use(protect);

// User bookings
router.get('/user', getUserBookings);

// Host bookings
router.get('/host', getHostBookings);

// Create booking
router.post('/', createBooking);

// Get, update, cancel specific booking
router.route('/:id')
  .get(getBooking)
  .patch(updateBooking)
  .delete(cancelBooking);

// Admin only routes
router.use(restrictTo('admin'));
router.get('/', getAllBookings);

export default router;