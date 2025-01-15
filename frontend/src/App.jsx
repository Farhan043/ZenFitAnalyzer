import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Start from './Pages/Start'
import Start2 from './Pages/Start2'
import Home from './Pages/Home'
import UserProtectWrapper from './Pages/UserProtectWrapper'
import Logout from './Pages/Logout'
import Start3 from './Pages/Start3'
import Start4 from './Pages/Start4'
import Start5 from './Pages/Start5'
import Goal from './Pages/Goal'
import Goal2 from './Pages/Goal2'
import Goal3 from './Pages/Goal3'
import Welcome from './Pages/Welcome'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path="/start2" element={<Start2 />} />
        <Route path="/start3" element={<Start3 />} />
        <Route path="/start4" element={<Start4 />} />
        <Route path="/start5" element={<Start5 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/goal2" element={<Goal2 />} />
        <Route path="/goal3" element={<Goal3 />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="logout" element={
          <UserProtectWrapper>
            <Logout />
          </UserProtectWrapper>
        } />
      </Routes>
    </>
  )
}

export default App