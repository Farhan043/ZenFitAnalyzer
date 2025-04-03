import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { UserDataContext } from './UserContext';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(UserDataContext);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const initializedRef = useRef(false);
  
  // Initialize cart when user changes (only once after user is available)
  useEffect(() => {
    // Skip if no user or already initialized for this user
    if (!user) {
      setCartItems([]);
      return;
    }
    
    const userId = user._id || user.id;
    if (!userId) {
      setCartItems([]);
      return;
    }
    
    // Get cart from localStorage
    const savedCart = localStorage.getItem(`cart_${userId}`);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!user) return;
    
    const userId = user._id || user.id;
    if (!userId) return;
    
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
  }, [cartItems, user]);

  // Calculate cart total whenever items change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setCartTotal(total);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: (updatedItems[existingItemIndex].quantity || 1) + 1
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount: cartItems.reduce((count, item) => count + (item.quantity || 1), 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider; 