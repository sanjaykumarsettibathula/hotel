import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Property from '../models/Property.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';
import additionalHotels from './additionalHotels.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/hotel-booking');
    console.log('DB connection successful for seeding');
    return true;
  } catch (err) {
    console.error('DB connection error:', err);
    return false;
  }
};

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
  },
  {
    name: 'Priya Sharma',
    email: 'priya@example.com',
    password: 'password123',
    role: 'user',
  },
  {
    name: 'Rahul Singh',
    email: 'rahul@example.com',
    password: 'password123',
    role: 'user',
  },
];

const properties = [
  {
    name: 'Luxury Lake View Villa',
    type: 'house',
    location: 'Udaipur, Rajasthan',
    price: 15000,
    rating: 4.9,
    reviews: 128,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80',
    ],
    amenities: ['Pool', 'Lake View', 'WiFi', 'Kitchen'],
    description: 'Stunning villa overlooking Lake Pichola with modern amenities.',
    details: {
      guests: 6,
      bedrooms: 3,
      beds: 4,
      baths: 3,
    },
    highlights: [
      'Lakefront property with panoramic views',
      'Private pool and garden',
      'Traditional Rajasthani architecture with modern amenities',
    ],
    tags: ['Lake View', 'Family-friendly', 'Pool'],
  },
  {
    name: 'Mountain Retreat',
    type: 'mountain',
    location: 'Manali, Himachal Pradesh',
    price: 8000,
    rating: 4.7,
    reviews: 95,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517320964276-a002fa203177?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80',
    ],
    amenities: ['Mountain View', 'Fireplace', 'Heating', 'Parking'],
    description: 'Cozy cottage with breathtaking mountain views.',
    details: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      baths: 2,
    },
    highlights: [
      'Panoramic Himalayan views',
      'Cozy fireplace for winter evenings',
      'Close to skiing spots',
    ],
    tags: ['Scenic', 'Skiing', 'Cozy'],
  },
  {
    name: 'Beachfront Resort',
    type: 'beach',
    location: 'Goa',
    price: 12000,
    rating: 4.8,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?auto=format&fit=crop&q=80',
    ],
    amenities: ['Beach Access', 'Pool', 'Restaurant', 'Spa'],
    description: 'Luxurious resort right on the beach with world-class amenities.',
    details: {
      guests: 3,
      bedrooms: 1,
      beds: 1,
      baths: 1,
    },
    highlights: [
      'Direct beach access',
      'Infinity pool overlooking the ocean',
      'Award-winning spa services',
    ],
    tags: ['Beachfront', 'Spa', 'Luxury'],
  },
];

// Function to import data
const importData = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.log('Failed to connect to database. Exiting...');
    process.exit(1);
  }
  
  try {
    // Clear existing data
    await User.deleteMany();
    await Property.deleteMany();
    await Booking.deleteMany();
    await Review.deleteMany();

    // Create users
    const createdUsers = await User.create(users);
    console.log(`${createdUsers.length} users created`);

    // Assign properties to users
    const adminUser = createdUsers[0]._id;
    const hostUser = createdUsers[1]._id;

    const propertiesToCreate = properties.map(property => ({
      ...property,
      host: hostUser,
      coordinates: {
        type: 'Point',
        coordinates: [0, 0] // Default coordinates
      }
    }));

    // Create properties
    const propertiesToCreateWithAdditional = [
      ...propertiesToCreate,
      ...additionalHotels.map(property => ({
        ...property,
        host: hostUser,
        coordinates: {
          type: 'Point',
          coordinates: [0, 0] // Default coordinates
        }
      }))
    ];
    
    const createdProperties = await Property.create(propertiesToCreateWithAdditional);
    console.log(`${createdProperties.length} properties created`);

    console.log('Data successfully loaded!');
  } catch (err) {
    console.error('Error importing data:', err);
  }
  process.exit();
};

// Function to delete all data
const deleteData = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.log('Failed to connect to database. Exiting...');
    process.exit(1);
  }
  
  try {
    await User.deleteMany();
    await Property.deleteMany();
    await Booking.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.error('Error deleting data:', err);
  }
  process.exit();
};

// Run the appropriate function based on command line argument
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Please specify --import or --delete');
  process.exit();
}