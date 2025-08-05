import { useState } from 'react';
import { FilterOptions, Property } from '../types';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  properties: Property[];
}

export default function FilterBar({ filters, onFilterChange, properties }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const allAmenities = Array.from(
    new Set(properties.flatMap((p) => p.amenities))
  ).sort();

  const maxPrice = Math.max(...properties.map((p) => p.price));
  const minPrice = Math.min(...properties.map((p) => p.price));

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border rounded-full hover:shadow-md transition"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-80 bg-white rounded-xl shadow-lg border p-4 z-10">
          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={filters.priceRange[1]}
                onChange={(e) => 
                  onFilterChange({
                    ...filters,
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)],
                  })
                }
                className="w-full"
              />
              <span className="whitespace-nowrap">
                Up to ₹{filters.priceRange[1].toLocaleString()}
              </span>
            </div>
          </div>

          {/* Guests */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Guests</h3>
            <select
              value={filters.guests}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  guests: parseInt(e.target.value),
                })
              }
              className="w-full p-2 border rounded-lg"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-semibold mb-2">Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              {allAmenities.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={(e) => {
                      const newAmenities = e.target.checked
                        ? [...filters.amenities, amenity]
                        : filters.amenities.filter((a) => a !== amenity);
                      onFilterChange({
                        ...filters,
                        amenities: newAmenities,
                      });
                    }}
                    className="rounded text-rose-500 focus:ring-rose-500"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              onFilterChange({
                priceRange: [0, maxPrice],
                guests: 1,
                amenities: [],
              });
              setIsOpen(false);
            }}
            className="w-full mt-4 px-4 py-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}