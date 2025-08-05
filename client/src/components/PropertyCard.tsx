import { Star } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="aspect-square w-full relative overflow-hidden rounded-xl">
        <img
          className="object-cover h-full w-full group-hover:scale-110 transition"
          src={property.images[0]}
          alt={property.name}
        />
        <div className="absolute bottom-2 right-2 flex gap-1">
          {property.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-white/90 px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{property.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current" />
            <span>{property.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">{property.location}</p>
        <p className="mt-2">
          <span className="font-semibold">₹{property.price.toLocaleString()}</span>
          <span className="text-gray-500"> / night</span>
        </p>
      </div>
    </div>
  );
}