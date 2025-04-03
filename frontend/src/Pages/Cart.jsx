import React, { useContext } from 'react';
import { FiPlus, FiMinus, FiTrash, FiArrowLeft } from 'react-icons/fi';
import { CartContext } from '../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../Components/Layout/MainLayout';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => navigate('/zenfitmarketplace')}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <FiArrowLeft size={20} />
              </button>
              <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <svg
                className="w-16 h-16 mx-auto text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="mt-4 text-lg font-medium text-gray-700">Your cart is empty</h2>
              <p className="mt-2 text-gray-500">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                to="/zenfitmarketplace"
                className="mt-6 inline-block bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <FiArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-center">
                        <div className="h-24 w-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain p-2"
                          />
                        </div>
                        
                        <div className="sm:ml-6 flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-800">
                                {item.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.category}
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0 text-right">
                              <p className="text-lg font-medium text-gray-800">
                                ₹{item.price}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                Total: ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                className="p-2 text-gray-600 hover:text-gray-800"
                                aria-label="Decrease quantity"
                              >
                                <FiMinus />
                              </button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity || 1}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                className="p-2 text-gray-600 hover:text-gray-800"
                                aria-label="Increase quantity"
                              >
                                <FiPlus />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-500 hover:text-red-700 flex items-center gap-1"
                              aria-label="Remove item"
                            >
                              <FiTrash />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="p-4 sm:p-6 border-t border-gray-200 flex justify-between items-center">
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    <FiTrash className="mr-1" />
                    Clear Cart
                  </button>
                  
                  <Link
                    to="/zenfitmarketplace"
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-medium text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.reduce((count, item) => count + (item.quantity || 1), 0)} items)</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between font-medium text-gray-800">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <button
                  className="mt-8 w-full bg-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                >
                  Proceed to Checkout
                </button>
                
                <Link
                  to="/zenfitmarketplace"
                  className="mt-4 w-full block text-center text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart; 