import { User, Property, CategoryType, FilterOptions } from '../types';

const API_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Authentication services
export const authService = {
  // Register a new user
  register: async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(response);
  },

  // Login a user
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  // Get current user profile
  getCurrentUser: async (): Promise<User> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/auth/updateMe`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Update password
  updatePassword: async (currentPassword: string, newPassword: string): Promise<{ user: User; token: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/auth/updateMyPassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return handleResponse(response);
  },
};

// Property services
export const propertyService = {
  // Get all properties with optional filtering
  getAllProperties: async (category?: CategoryType, filters?: FilterOptions, searchTerm?: string): Promise<Property[]> => {
    let url = `${API_URL}/properties`;
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    
    if (category && category !== 'all') {
      queryParams.append('type', category);
    }
    
    if (filters) {
      if (filters.priceRange) {
        queryParams.append('price[gte]', filters.priceRange[0].toString());
        queryParams.append('price[lte]', filters.priceRange[1].toString());
      }
      
      if (filters.guests) {
        queryParams.append('details.guests[gte]', filters.guests.toString());
      }
      
      if (filters.amenities && filters.amenities.length > 0) {
        // For simplicity, we'll just filter client-side for amenities
        // In a real app, you might want to handle this differently on the server
      }
    }
    
    // Add search term to query parameters
    if (searchTerm && searchTerm.trim() !== '') {
      queryParams.append('search', searchTerm.trim());
    }
    
    // Add query parameters to URL if any exist
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    const response = await fetch(url);
    const result = await handleResponse(response);
    
    // Return the properties from the response
    return result.data?.properties || [];

  },

  // Get property by ID
  getPropertyById: async (id: string): Promise<Property> => {
    const response = await fetch(`${API_URL}/properties/${id}`);
    return handleResponse(response);
  },

  // Create a new property (requires authentication)
  createProperty: async (propertyData: Partial<Property>): Promise<Property> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(propertyData),
    });
    return handleResponse(response);
  },

  // Update a property (requires authentication)
  updateProperty: async (id: string, propertyData: Partial<Property>): Promise<Property> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/properties/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(propertyData),
    });
    return handleResponse(response);
  },

  // Delete a property (requires authentication)
  deleteProperty: async (id: string): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/properties/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};

// Booking services
export const bookingService = {
  // Create a new booking
  createBooking: async (propertyId: string, checkIn: Date, checkOut: Date, guests: number): Promise<any> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        property: propertyId,
        checkIn,
        checkOut,
        guests,
      }),
    });
    return handleResponse(response);
  },

  // Get user bookings
  getUserBookings: async (): Promise<any[]> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/bookings/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  // Cancel a booking
  cancelBooking: async (bookingId: string): Promise<any> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};

// Review services
export const reviewService = {
  // Get reviews for a property
  getPropertyReviews: async (propertyId: string): Promise<any[]> => {
    const response = await fetch(`${API_URL}/properties/${propertyId}/reviews`);
    return handleResponse(response);
  },

  // Create a review for a property
  createReview: async (propertyId: string, rating: number, review: string): Promise<any> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/properties/${propertyId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, review }),
    });
    return handleResponse(response);
  },

  // Update a review
  updateReview: async (propertyId: string, reviewId: string, rating: number, review: string): Promise<any> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/properties/${propertyId}/reviews/${reviewId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, review }),
    });
    return handleResponse(response);
  },

  // Delete a review
  deleteReview: async (propertyId: string, reviewId: string): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/properties/${propertyId}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};