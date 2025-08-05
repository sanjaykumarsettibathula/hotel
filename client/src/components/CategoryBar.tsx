import { Hotel, Home, Waves, Mountain } from 'lucide-react';
import { CategoryType } from '../types';

interface CategoryBarProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export default function CategoryBar({ selectedCategory, onSelectCategory }: CategoryBarProps) {
  const categories = [
    { id: 'all', label: 'All', icon: null },
    { id: 'hotel', label: 'Hotels', icon: Hotel },
    { id: 'house', label: 'Houses', icon: Home },
    { id: 'beach', label: 'Beach', icon: Waves },
    { id: 'mountain', label: 'Mountains', icon: Mountain },
  ] as const;

  return (
    <div className="flex gap-8 py-4 overflow-x-auto scrollbar-hide">
      {categories.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelectCategory(id as CategoryType)}
          className={`flex flex-col items-center gap-1 min-w-fit ${
            selectedCategory === id
              ? 'text-rose-500 border-b-2 border-rose-500'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {Icon && <Icon className="h-6 w-6" />}
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
}