import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A property must have a name'],
      trim: true,
      maxlength: [100, 'A property name must have less than 100 characters'],
    },
    type: {
      type: String,
      required: [true, 'A property must have a type'],
      enum: {
        values: ['hotel', 'house', 'beach', 'mountain'],
        message: 'Type must be: hotel, house, beach, or mountain',
      },
    },
    location: {
      type: String,
      required: [true, 'A property must have a location'],
    },
    coordinates: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: {
        type: [Number] // [longitude, latitude]
      }
    },
    price: {
      type: Number,
      required: [true, 'A property must have a price'],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // Round to 1 decimal place
    },
    reviews: {
      type: Number,
      default: 0,
    },
    images: [String],
    amenities: [String],
    description: {
      type: String,
      required: [true, 'A property must have a description'],
      trim: true,
    },
    host: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A property must have a host'],
    },
    details: {
      guests: {
        type: Number,
        required: [true, 'A property must specify max number of guests'],
      },
      bedrooms: {
        type: Number,
        required: [true, 'A property must specify number of bedrooms'],
      },
      beds: {
        type: Number,
        required: [true, 'A property must specify number of beds'],
      },
      baths: {
        type: Number,
        required: [true, 'A property must specify number of bathrooms'],
      },
    },
    highlights: [String],
    tags: [String],
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
propertySchema.index({ price: 1, rating: -1 });
propertySchema.index({ coordinates: '2dsphere' });

// Virtual populate for reviews
propertySchema.virtual('reviewsData', {
  ref: 'Review',
  foreignField: 'property',
  localField: '_id',
});

// Virtual populate for bookings
propertySchema.virtual('bookings', {
  ref: 'Booking',
  foreignField: 'property',
  localField: '_id',
});

// Populate host field with user data
propertySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'host',
    select: 'name avatar',
  });
  next();
});

const Property = mongoose.model('Property', propertySchema);

export default Property;