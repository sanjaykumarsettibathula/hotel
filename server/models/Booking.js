import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a user'],
    },
    property: {
      type: mongoose.Schema.ObjectId,
      ref: 'Property',
      required: [true, 'Booking must belong to a property'],
    },
    checkIn: {
      type: Date,
      required: [true, 'Booking must have a check-in date'],
    },
    checkOut: {
      type: Date,
      required: [true, 'Booking must have a check-out date'],
      validate: {
        validator: function (val) {
          // Check if check-out date is after check-in date
          return val > this.checkIn;
        },
        message: 'Check-out date must be after check-in date',
      },
    },
    guests: {
      type: Number,
      required: [true, 'Booking must have number of guests'],
      min: [1, 'Number of guests must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Booking must have a total price'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'other'],
    },
    paymentId: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
bookingSchema.index({ property: 1, checkIn: 1, checkOut: 1 });
bookingSchema.index({ user: 1 });

// Populate user and property fields
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email',
  }).populate({
    path: 'property',
    select: 'name images location price',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;