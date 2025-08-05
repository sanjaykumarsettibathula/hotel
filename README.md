# Hotel Booking Application

A full-stack hotel booking application built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

- User authentication (signup, login)
- Property listing with filtering by category, price, guests, and amenities
- Property details view with images, amenities, and booking options
- Booking system with date selection and guest count
- User profile management
- Review system for properties

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx         # Main application component
│   ├── package.json        # Frontend dependencies
│   └── ...
│
├── server/                 # Backend Node.js application
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── utils/              # Utility functions
│   ├── uploads/            # Uploaded files
│   ├── index.js            # Server entry point
│   ├── package.json        # Backend dependencies
│   └── ...
│
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository

2. Install backend dependencies
   ```
   cd server
   npm install
   ```

3. Install frontend dependencies
   ```
   cd client
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   NODE_ENV=development
   ```

### Running the Application

1. Start the backend server
   ```
   cd server
   npm start
   ```

2. Start the frontend development server
   ```
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile
- `PATCH /api/auth/updateMyPassword` - Update password
- `PATCH /api/auth/updateMe` - Update user details
- `DELETE /api/auth/deleteMe` - Deactivate user account

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/top` - Get top-rated properties
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create a new property
- `PATCH /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/properties/host/properties` - Get host properties

### Bookings
- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings/host` - Get host bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/:id` - Get booking details
- `PATCH /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Reviews
- `GET /api/properties/:propertyId/reviews` - Get reviews for a property
- `POST /api/properties/:propertyId/reviews` - Create a review
- `GET /api/properties/:propertyId/reviews/:id` - Get review details
- `PATCH /api/properties/:propertyId/reviews/:id` - Update review
- `DELETE /api/properties/:propertyId/reviews/:id` - Delete review

## License

This project is licensed under the MIT License.