import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiLogOut } from 'react-icons/fi';
import { UserDataContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, setUser } = useContext(UserDataContext);
  const { itemCount, clearCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/zenfitmarketplace?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profilePicture');
    
    // Clear cart data
    clearCart();
    
    // Update context
    setUser(null);
    
    // Navigate to login page
    navigate('/login');
  };
  
  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">
                <span className="text-emerald-500">Zen</span>
                <span className="text-gray-800">Fit</span>
                <span className="text-gray-800">Marketplace</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/home" 
              className={`text-gray-700 hover:text-emerald-500 transition-colors ${
                location.pathname === '/home' ? 'font-semibold text-emerald-500' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/zenfitmarketplace" 
              className={`text-gray-700 hover:text-emerald-500 transition-colors ${
                location.pathname.includes('/zenfitmarketplace') ? 'font-semibold text-emerald-500' : ''
              }`}
            >
              Marketplace
            </Link>
            <Link 
              to="/workout" 
              className={`text-gray-700 hover:text-emerald-500 transition-colors ${
                location.pathname.includes('/workout') ? 'font-semibold text-emerald-500' : ''
              }`}
            >
              Workouts
            </Link>
            <Link 
              to="/meal" 
              className={`text-gray-700 hover:text-emerald-500 transition-colors ${
                location.pathname.includes('/social') ? 'font-semibold text-emerald-500' : ''
              }`}
            >
              Meals
            </Link>
            <Link 
              to="/social" 
              className={`text-gray-700 hover:text-emerald-500 transition-colors ${
                location.pathname.includes('/social') ? 'font-semibold text-emerald-500' : ''
              }`}
            >
              Community
            </Link>
          </div>
          
          {/* Search, Cart, and User */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>
            
            <Link to="/cart" className="relative p-2">
              <FiShoppingCart className="text-gray-700 text-xl" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-emerald-500 transition-all">
                    {user.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt="Profile" 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <FiUser className="text-emerald-500" />
                    )}
                  </div>
                  <span className="hidden lg:inline text-gray-700 group-hover:text-emerald-500">
                    {user.name || user.username || 'My Account'}
                  </span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 hidden group-hover:block">
                  <div className="py-2">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/notification" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Notifications
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <FiShoppingCart className="text-gray-700 text-xl" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
            
            <button
              type="button"
              className="text-gray-700 hover:text-emerald-500 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="px-4 mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </form>

              <Link
                to="/home"
                className={`px-4 py-2 ${
                  location.pathname === '/home' ? 'text-emerald-500 font-semibold' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/zenfitmarketplace"
                className={`px-4 py-2 ${
                  location.pathname.includes('/zenfitmarketplace') ? 'text-emerald-500 font-semibold' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                to="/workout"
                className={`px-4 py-2 ${
                  location.pathname.includes('/workout') ? 'text-emerald-500 font-semibold' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Workouts
              </Link>
              <Link
                to="/social"
                className={`px-4 py-2 ${
                  location.pathname.includes('/social') ? 'text-emerald-500 font-semibold' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              
              <div className="border-t border-gray-200 pt-4 mt-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden">
                        {user.profilePicture ? (
                          <img 
                            src={user.profilePicture} 
                            alt="Profile" 
                            className="h-full w-full object-cover" 
                          />
                        ) : (
                          <FiUser className="text-emerald-500" />
                        )}
                      </div>
                      <span className="ml-2 text-gray-700">
                        {user.name || user.username || 'My Account'}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/notification"
                      className="block px-4 py-2 text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Notifications
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-red-500 flex items-center"
                    >
                      <FiLogOut className="mr-2" /> Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-2 text-emerald-500 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUser className="mr-2" /> Login / Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;