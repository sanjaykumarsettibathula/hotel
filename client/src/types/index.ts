export interface Property {
  id: string;
  name: string;
  type: 'hotel' | 'house' | 'beach' | 'mountain';
  location: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  description: string;
  host: {
    name: string;
    image: string;
    joinedDate: string;
  };
  details: {
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number;
  };
  highlights: string[];
  tags: string[];
}

export interface User {
  email: string;
  name?: string;
  avatar?: string;
}

export type CategoryType = 'all' | 'hotel' | 'house' | 'beach' | 'mountain';

export interface FilterOptions {
  priceRange: [number, number];
  guests: number;
  amenities: string[];
}