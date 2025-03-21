
import { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    dob: '',
    weight: '',
    height: '',
  })

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
  
  return (
    <div>
      <UserDataContext.Provider value={{ user, setUser , updateUser }}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext