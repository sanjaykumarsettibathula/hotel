import express from 'express';
import {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setPropertyUserIds,
  getUserReviews,
} from '../controllers/reviewController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router({ mergeParams: true });

// Public routes
router.get('/', getAllReviews);
router.get('/:id', getReview);

// Protected routes
router.use(protect);

// Get current user's reviews
router.get('/user/reviews', getUserReviews);

// Create, update, delete reviews
router.post('/', setPropertyUserIds, createReview);
router.route('/:id')
  .patch(updateReview)
  .delete(deleteReview);

export default router;