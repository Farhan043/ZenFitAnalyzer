import { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../Context/UserContext'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import MainLayout from '../../Components/Layout/MainLayout'
import { CartContext } from '../../Context/CartContext'

const UserProtectWrapper = ({ children }) => {
  const { user, setUser } = useContext(UserDataContext)
  const { clearCart } = useContext(CartContext)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true;
    
    if (!token) {
      // Clear user data on logout
      setUser(null)
      clearCart()
      navigate('/login')
      return
    }

    // Fetch user profile
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
  
        if (response.status === 200 && isMounted) {
          // Handle both possible API response structures
          const userData = response.data.user || response.data
          
          // Only update user if there's a change or user is null
          if (!user || JSON.stringify(user) !== JSON.stringify(userData)) {
            setUser(userData)
          }
          
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error fetching user profile:', err)
        if (isMounted) {
          localStorage.removeItem('token')
          setUser(null)
          clearCart()
          navigate('/login')
        }
      }
    }

    fetchUserProfile()
    
    // Cleanup function
    return () => {
      isMounted = false;
    }
  }, [token]) // Only depend on token changes

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (location.pathname === '/home') {
    return children
  }

  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}

export default UserProtectWrapper