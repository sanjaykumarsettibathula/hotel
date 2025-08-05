import { Search, Menu, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onLoginClick: () => void;
  onSearch: (searchTerm: string) => void;
}

export default function Navbar({ onLoginClick, onSearch }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-rose-500">StaySpot</h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-4 top-2.5"
              >
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full">
              Become a host
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 p-2 border border-gray-300 rounded-full hover:shadow-md"
            >
              <Menu size={18} />
              <User size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute right-4 top-16 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
          <div className="flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 font-medium">
                  {user?.name || user?.email}
                </div>
                <button 
                  className="text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMenuOpen(false);
                  }}
                  className="text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMenuOpen(false);
                  }}
                  className="text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Sign up
                </button>
              </>
            )}
            <hr className="my-2" />
            <button className="text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
              Become a host
            </button>
            <button className="text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
              Help Center
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}