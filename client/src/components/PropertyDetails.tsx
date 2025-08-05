import { ArrowLeft, Heart, Share, Star, User, Wifi, Car, Tv, Coffee, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Property } from '../types';
import { useAuth } from '../context/AuthContext';

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyDetails({ property, onClose }: PropertyDetailsProps) {
  const { isAuthenticated, user } = useAuth();
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [guests, setGuests] = useState<number>(1);
  const [bookingError, setBookingError] = useState<string>('');
  
  const amenityIcons = {
    'WiFi': <Wifi className="h-6 w-6" />,
    'Parking': <Car className="h-6 w-6" />,
    'TV': <Tv className="h-6 w-6" />,
    'Kitchen': <Coffee className="h-6 w-6" />,
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-full">
              <Share className="h-5 w-5" />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-5 w-5" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="hidden md:grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={property.images[0]}
                alt={`${property.name} view ${i + 2}`}
                className="w-full h-[195px] object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Title Section */}
            <div className="border-b pb-6 mb-6">
              <h1 className="text-3xl font-semibold mb-2">{property.name}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-semibold">{property.rating}</span>
                  <span>·</span>
                  <span className="underline">{property.reviews} reviews</span>
                  <span>·</span>
                  <span className="underline">{property.location}</span>
                </div>
              </div>
            </div>

            {/* Host Info */}
            <div className="border-b pb-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Hosted by {property.host.name}</h2>
                  <p className="text-gray-500">Joined in {property.host.joinedDate}</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="border-b pb-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {property.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Star className="h-6 w-6" />
                    </div>
                    <p className="text-sm">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="border-b pb-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-4">
                    {amenityIcons[amenity as keyof typeof amenityIcons]}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-2xl font-semibold">₹{property.price.toLocaleString()}</span>
                  <span className="text-gray-500"> / night</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{property.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="col-span-2 border rounded-t-lg p-3">
                  <label className="block text-xs font-semibold">CHECK-IN</label>
                  <input 
                    type="date" 
                    className="w-full mt-1" 
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                </div>
                <div className="col-span-2 border-x border-b rounded-b-lg p-3">
                  <label className="block text-xs font-semibold">CHECKOUT</label>
                  <input 
                    type="date" 
                    className="w-full mt-1" 
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                  />
                </div>
                <div className="col-span-2 border rounded-lg p-3">
                  <label className="block text-xs font-semibold">GUESTS</label>
                  <select 
                    className="w-full mt-1"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  >
                    {[...Array(property.details.guests)].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'guest' : 'guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {bookingError && (
                <div className="flex items-center gap-2 text-red-500 mb-4 p-2 bg-red-50 rounded">
                  <AlertCircle size={16} />
                  <span className="text-sm">{bookingError}</span>
                </div>
              )}

              <button 
                className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition"
                onClick={() => {
                  if (!isAuthenticated) {
                    setBookingError('Please log in to book this property');
                    return;
                  }
                  
                  if (!checkInDate || !checkOutDate) {
                    setBookingError('Please select check-in and check-out dates');
                    return;
                  }
                  
                  // Here we would call the booking service
                  alert(`Booking successful for ${property.name}!\nDates: ${checkInDate} to ${checkOutDate}\nGuests: ${guests}`);
                }}
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}