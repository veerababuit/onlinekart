import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:5000/api/dashboard/wishlist', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      }).then(res => {
        setWishlist(res.data);
      }).catch(err => console.log(err));
    }
  }, [user]);

  const addToWishlist = async (productId) => {
    try {
      const res = await axios.post('http://localhost:5000/api/dashboard/wishlist', { productId }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setWishlist(res.data);
    } catch (error) {
      console.log('Failed to add product to wishlist:', error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => React.useContext(WishlistContext);
