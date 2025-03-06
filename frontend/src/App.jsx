import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Register/Login'
import Register from './Pages/Register/Register'
import Start from './Pages/Onboarding/Start'
import Start2 from './Pages/Onboarding/Start2'
import Home from './Pages/Home'
import UserProtectWrapper from './Pages/Register/UserProtectWrapper'
// import Logout from './Pages/Logout'
import Start3 from './Pages/Onboarding/Start3'
import Start4 from './Pages/Onboarding/Start4'
import Start5 from './Pages/Onboarding/Start5'
// import Goal from './Pages/Onboarding/Goal'
// import Goal2 from './Pages/Onboarding/Goal2'
// import Goal3 from './Pages/Onboarding/Goal3'
import Welcome from './Pages/Onboarding/Welcome'
import Notification from './Pages/Notification'
import Profile from './Pages/HomeFooter/Profile'
import Camera from './Pages/HomeFooter/Camera'
import Meal from './Pages/HomeFooter/Meal'
// import Alarm from './Pages/Sleep/Alarm'
import SleepTracker from './Pages/Sleep/SleepTracker'
import Workout from './Pages/HomeFooter/Workout'
import ActivityTracker from './Pages/ActivityTracker'
// import { ThemeProvider } from './Context/ThemeContext'
import MusicHome from './Pages/Musics/MusicHome'
// import { div } from 'motion/react-client'

const App = () => {
  return (
    <>
      {/* <ThemeProvider> */}
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/start2" element={<Start2 />} />
          <Route path="/start3" element={<Start3 />} />
          <Route path="/start4" element={<Start4 />} />
          <Route path="/start5" element={<Start5 />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/goal" element={<Goal />} />
        <Route path="/goal2" element={<Goal2 />} />
        <Route path="/goal3" element={<Goal3 />} /> */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={
            <UserProtectWrapper>
              <Home />
            // </UserProtectWrapper>
          } />
          <Route path="/notification" element={<Notification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/camera" element={<Camera />} />

          <Route path="/meal" element={
            <Meal />
          } />

          <Route path="/workout" element={<Workout />} />
          {/* <Route path="/alarm" element={<Alarm />} /> */}
          <Route path="/sleeptracker" element={<SleepTracker />} />
          <Route path="/activity-tracker" element={<ActivityTracker />} />
          <Route path="/musichome" element={<MusicHome />} />

          {/* <Route path="logout" element={
          <UserProtectWrapper>
            <Logout />
          </UserProtectWrapper>
        } /> */}
        </Routes>
      {/* </ThemeProvider> */}
    </>
  )
}

export default App