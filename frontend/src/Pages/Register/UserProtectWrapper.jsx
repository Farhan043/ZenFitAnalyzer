import { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({ children }) => {
  const { user, setUser } = useContext(UserDataContext)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    if (!token) {
      navigate('/login')
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.status === 200) {
        setUser(response.data)
        setIsLoading(false)
      }
    })
      .catch(err => {
        console.log(err)
        localStorage.removeItem('token')
        navigate('/login')
      })
  }, [token])


  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
      </>

    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper