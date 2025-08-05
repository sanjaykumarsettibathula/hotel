import Review from '../models/Review.js';
import Booking from '../models/Booking.js';

// Set property and user IDs for new review
export const setPropertyUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.property) req.body.property = req.params.propertyId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// Create new review
export const createReview = async (req, res) => {
  try {
    // Check if user has stayed at the property (has a completed booking)
    const booking = await Booking.findOne({
      user: req.user.id,
      property: req.body.property,
      status: 'completed',
    });

    if (!booking && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only review properties where you have completed a stay',
      });
    }

    const newReview = await Review.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        review: newReview,
      },
    });
  } catch (err) {
    // Handle duplicate review error
    if (err.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        message: 'You have already reviewed this property',
      });
    }

    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    let filter = {};
    if (req.params.propertyId) filter = { property: req.params.propertyId };

    const reviews = await Review.find(filter);

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get review by ID
export const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'No review found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update review
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'No review found with that ID',
      });
    }

    // Check if user is the review author or admin
    if (review.user.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only update your own reviews',
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        review: updatedReview,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'No review found with that ID',
      });
    }

    // Check if user is the review author or admin
    if (review.user.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only delete your own reviews',
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get user reviews
export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id });

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};