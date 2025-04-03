import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight, FiAward, FiTruck, FiPercent } from 'react-icons/fi';

const MarketPlace = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/zenfitmarketplace');
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 my-4 shadow-2xl border border-gray-700">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-blue-500 p-2 rounded-full mb-4">
            <FiShoppingBag className="text-white text-xl" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Amazon Partner <span className="text-emerald-400">Store</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Find premium fitness equipment and supplements through our Amazon affiliate store.
            Support ZenFit while getting the best deals on quality products.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Image & Benefits */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-3xl blur-2xl transform -rotate-6"></div>
            <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 shadow-xl">
              <div className="aspect-w-4 aspect-h-3 p-6 flex items-center justify-center">
                <img 
                  src="/amazon-logo.png" 
                  alt="Amazon Partner Store"
                  className="w-full max-w-xs mx-auto object-contain h-28"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/400x300/2C3E50/FFFFFF?text=Amazon+Partner";
                  }}
                />
              </div>
              
              <div className="p-6 bg-gray-800/90">
                <h3 className="text-xl font-semibold mb-4 text-center">Our Partnership Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FiAward className="text-emerald-400 text-xl flex-shrink-0 mt-1 mr-3" />
                    <p className="text-gray-300">Curated selection of premium fitness equipment and supplements</p>
                  </li>
                  <li className="flex items-start">
                    <FiTruck className="text-emerald-400 text-xl flex-shrink-0 mt-1 mr-3" />
                    <p className="text-gray-300">Fast shipping with Amazon Prime eligible products</p>
                  </li>
                  <li className="flex items-start">
                    <FiPercent className="text-emerald-400 text-xl flex-shrink-0 mt-1 mr-3" />
                    <p className="text-gray-300">Exclusive discounts and deals for ZenFit users</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right - Call to Action */}
          <div className="flex flex-col h-full justify-center">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Start shopping with confidence</h3>
              <p className="text-gray-300 mb-6">
                Our Amazon affiliate store features products we've personally tested and recommended. Every purchase supports ZenFit while getting you premium fitness equipment at the best prices.
              </p>
              
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={handleExploreClick}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium py-4 px-6 rounded-xl hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  Browse Amazon Products <FiArrowRight />
                </button>
                
                <p className="text-xs text-gray-400 text-center mt-2">
                  As an Amazon Associate, we earn from qualifying purchases
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-10">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <span className="text-xl font-bold">500+</span>
                  </div>
                  <span className="text-xs text-gray-400">Products</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-emerald-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <span className="text-xl font-bold">4.8/5</span>
                  </div>
                  <span className="text-xs text-gray-400">Avg. Rating</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <span className="text-xl font-bold">24h</span>
                  </div>
                  <span className="text-xs text-gray-400">Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400">
            Amazon, the Amazon logo, and the Amazon Partner logo are trademarks of Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;