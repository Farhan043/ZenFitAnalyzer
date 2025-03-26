import { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Ensure profile picture is loaded from localStorage
      if (!parsedUser.profilePicture) {
        parsedUser.profilePicture = localStorage.getItem('profilePicture');
      }
      return parsedUser;
    }
    return null;
  });

  const updateUser = (newUserData) => {
    setUser(prevUser => ({ ...prevUser, ...newUserData }));
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
 
    useEffect(() => {
      fetchData();
    }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.profilePicture) {
        localStorage.setItem('profilePicture', user.profilePicture);
      }
    }
  }, [user]);
  
  return (
    <div>
      <UserDataContext.Provider value={{ user, setUser , updateUser }}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext


