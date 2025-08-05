import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import PropertyCard from './components/PropertyCard';
import AuthModal from './components/AuthModal';
import PropertyDetails from './components/PropertyDetails';
import CategoryBar from './components/CategoryBar';
import FilterBar from './components/FilterBar';
import { Property, CategoryType, FilterOptions } from './types';
import { propertyService } from './services/api';

const sampleProperties: Property[] = [
  {
    id: '1',
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
    host: {
      name: 'Priya Sharma',
      image: '',
      joinedDate: 'March 2020',
    },
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
    id: '2',
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
    host: {
      name: 'Rahul Singh',
      image: '',
      joinedDate: 'June 2021',
    },
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
    id: '3',
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
    host: {
      name: 'Maria D\'Souza',
      image: '',
      joinedDate: 'January 2019',
    },
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
  {
    id: '4',
    name: 'The Taj Palace Hotel',
    type: 'hotel',
    location: 'New Delhi',
    price: 25000,
    rating: 4.9,
    reviews: 312,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80',
    ],
    amenities: ['5-Star Dining', 'Spa', 'Pool', 'Gym', 'Room Service'],
    description: 'Iconic 5-star hotel in the heart of New Delhi.',
    host: {
      name: 'Taj Hotels',
      image: '',
      joinedDate: 'Est. 1903',
    },
    details: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      baths: 1,
    },
    highlights: [
      'Award-winning restaurants',
      'Historic luxury property',
      'World-class service',
    ],
    tags: ['Luxury', '5-Star', 'Historic'],
  },
  {
    id: '5',
    name: 'Himalayan Eco Resort',
    type: 'mountain',
    location: 'Darjeeling, West Bengal',
    price: 6500,
    rating: 4.6,
    reviews: 89,
    images: [
      'https://images.unsplash.com/photo-1517320964276-a002fa203177?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80',
    ],
    amenities: ['Mountain View', 'Organic Farm', 'Trekking', 'Tea Garden'],
    description: 'Sustainable eco-resort with stunning mountain views.',
    host: {
      name: 'Green Stays',
      image: '',
      joinedDate: 'April 2018',
    },
    details: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      baths: 1,
    },
    highlights: [
      'Organic farm-to-table dining',
      'Tea garden tours',
      'Guided mountain treks',
    ],
    tags: ['Eco-friendly', 'Trekking', 'Organic'],
  },
  {
    id: '6',
    name: 'Kovalam Beach Villa',
    type: 'beach',
    location: 'Kerala',
    price: 18000,
    rating: 4.8,
    reviews: 134,
    images: [
      'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80',
    ],
    amenities: ['Private Beach', 'Ayurveda Spa', 'Pool', 'Garden'],
    description: 'Traditional Kerala-style villa with private beach access.',
    host: {
      name: 'Kerala Stays',
      image: '',
      joinedDate: 'May 2019',
    },
    details: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      baths: 2,
    },
    highlights: [
      'Traditional architecture',
      'Ayurvedic treatments',
      'Secluded beach',
    ],
    tags: ['Ayurveda', 'Private Beach', 'Traditional'],
  },
];

function App() {
  const { isLoading: authLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 50000],
    guests: 1,
    amenities: [],
  });
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch properties from the API or use sample data
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // In a real application, we would use the API
        // const data = await propertyService.getAllProperties(selectedCategory, filters, searchTerm);
        // setProperties(data);
        
        // For now, we'll filter the sample data client-side
        const filteredData = await propertyService.getAllProperties(selectedCategory, filters, searchTerm);
        setProperties(filteredData);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      }
    };
    
    fetchProperties();
  }, [selectedCategory, filters, searchTerm]);

  // We're now handling filtering in the useEffect with propertyService
  const filteredProperties = properties;

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        <p className="mt-4 text-gray-600">Loading new hotel listings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onLoginClick={() => setShowAuthModal(true)} 
        onSearch={setSearchTerm}
      />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          properties={sampleProperties}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => setSelectedProperty(property)}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900">No properties found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </main>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      
      {selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}

export default App;