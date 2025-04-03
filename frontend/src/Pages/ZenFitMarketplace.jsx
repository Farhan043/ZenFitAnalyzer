import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { products, categories } from '../assets/products';
import { FiSearch, FiShoppingCart, FiCheck } from 'react-icons/fi';
import { CartContext } from '../Context/CartContext';
import MainLayout from '../Components/Layout/MainLayout';
import Footer from '../Components/Footer';

const ZenFitMarketplace = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [addedToCart, setAddedToCart] = useState({});
  const { addToCart, cartItems } = useContext(CartContext);

  // Parse search query from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [location]);

  const handleAddToCart = (product) => {
    addToCart(product);
    
    // Show visual feedback
    setAddedToCart((prev) => ({ 
      ...prev, 
      [product.id]: true 
    }));
    
    // Reset visual feedback after 2 seconds
    setTimeout(() => {
      setAddedToCart((prev) => ({ 
        ...prev, 
        [product.id]: false 
      }));
    }, 2000);
  };

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortProducts = (products) => {
    switch (sortBy) {
      case 'Price: Low to High':
        return [...products].sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return [...products].sort((a, b) => b.price - a.price);
      case 'Best Rating':
        return [...products].sort((a, b) => b.rating - a.rating);
      case 'Newest':
        return [...products].sort((a, b) => b.id - a.id);
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(filteredProducts);

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-[#B4ECE3]">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Your Fitness Journey
                <br />
                <span className="text-emerald-700">Starts Here</span>
              </h1>
              <p className="text-gray-600 mb-8 max-w-md">
                Discover premium fitness products to help you achieve your wellness goals. 
                From supplements to gym equipment, we've got everything you need.
              </p>
              <div className="flex gap-4">
                <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors">
                  Shop Now
                </button>
                <button className="bg-white text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Browse Categories
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="w-64 h-64 md:w-96 md:h-96 bg-emerald-300/30 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              <img
                src="/dumbel.png"
                alt="Fitness Equipment"
                className="relative z-10 w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Featured Products Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
            <p className="text-gray-600">Discover our curated selection of premium fitness gear</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Sort Options */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm gap-4">
          <div className="relative w-full md:w-auto md:flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative w-full md:w-auto">
            <select 
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer hover:bg-gray-50 transition-colors w-full md:w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Featured">Featured</option>
              <option value="Newest">Newest</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Best Rating">Best Rating</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group">
              <div className="relative">
                <div className="aspect-w-1 aspect-h-1">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-6 bg-gray-50 group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                {product.price < 500 && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Deal
                  </span>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.category === 'Equipment' ? 'bg-blue-100 text-blue-700' :
                    product.category === 'Supplements' ? 'bg-purple-100 text-purple-700' :
                    product.category === 'Clothing' ? 'bg-pink-100 text-pink-700' :
                    product.category === 'Accessories' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {product.category}
                  </span>
                  <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="ml-1 text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-gray-400 text-xs ml-1">({product.reviews})</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{product.platform}</span>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(product.link, '_blank')}
                    className="flex-1 bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] py-2.5 px-4 rounded-lg transition-colors font-medium border border-[#FCD200] shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Buy on Amazon
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-medium border flex items-center justify-center gap-2 transition-all duration-200 ${
                      addedToCart[product.id] || isProductInCart(product.id)
                        ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600'
                        : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {addedToCart[product.id] ? (
                      <>
                        <FiCheck /> Added
                      </>
                    ) : isProductInCart(product.id) ? (
                      <>
                        <FiShoppingCart /> In Cart
                      </>
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </MainLayout>
  );
};

export default ZenFitMarketplace;
