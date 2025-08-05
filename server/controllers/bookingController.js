import Booking from '../models/Booking.js';
import Property from '../models/Property.js';

// Create new booking
export const createBooking = async (req, res) => {
  try {
    // Add user ID from authenticated user
    req.body.user = req.user.id;

    // Calculate total price based on property price and duration
    const property = await Property.findById(req.body.property);
    if (!property) {
      return res.status(404).json({
        status: 'fail',
        message: 'No property found with that ID',
      });
    }

    const checkIn = new Date(req.body.checkIn);
    const checkOut = new Date(req.body.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Check-out date must be after check-in date',
      });
    }

    // Check if property is available for the requested dates
    const existingBooking = await Booking.findOne({
      property: req.body.property,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        // New booking starts during an existing booking
        {
          checkIn: { $lte: checkIn },
          checkOut: { $gte: checkIn },
        },
        // New booking ends during an existing booking
        {
          checkIn: { $lte: checkOut },
          checkOut: { $gte: checkOut },
        },
        // New booking completely contains an existing booking
        {
          checkIn: { $gte: checkIn },
          checkOut: { $lte: checkOut },
        },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({
        status: 'fail',
        message: 'Property is not available for the selected dates',
      });
    }

    // Check if number of guests is within property limit
    if (req.body.guests > property.details.guests) {
      return res.status(400).json({
        status: 'fail',
        message: `This property can only accommodate ${property.details.guests} guests`,
      });
    }

    // Calculate total price
    req.body.totalPrice = property.price * nights;

    const newBooking = await Booking.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        booking: newBooking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get all bookings (admin only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get booking by ID
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: 'fail',
        message: 'No booking found with that ID',
      });
    }

    // Check if user is the booking owner, property host, or admin
    if (
      booking.user.id !== req.user.id &&
      booking.property.host.id !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to view this booking',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        booking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update booking status
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: 'fail',
        message: 'No booking found with that ID',
      });
    }

    // Only allow updating status and paymentStatus fields
    const allowedUpdates = ['status', 'paymentStatus'];
    const updates = {};

    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Check permissions based on update type
    if (updates.status) {
      // Only host or admin can update booking status
      if (booking.property.host.id !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          status: 'fail',
          message: 'Only the property host or admin can update booking status',
        });
      }
    }

    if (updates.paymentStatus) {
      // Only admin can update payment status
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          status: 'fail',
          message: 'Only admin can update payment status',
        });
      }
    }

    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        booking: updatedBooking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: 'fail',
        message: 'No booking found with that ID',
      });
    }

    // Only the booking user, property host, or admin can cancel a booking
    if (
      booking.user.id !== req.user.id &&
      booking.property.host.id !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to cancel this booking',
      });
    }

    // Update booking status to cancelled
    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      status: 'success',
      data: {
        booking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get host bookings (bookings for properties owned by the host)
export const getHostBookings = async (req, res) => {
  try {
    // First get all properties owned by the host
    const properties = await Property.find({ host: req.user.id });
    const propertyIds = properties.map((property) => property._id);

    // Then get all bookings for those properties
    const bookings = await Booking.find({ property: { $in: propertyIds } });

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};