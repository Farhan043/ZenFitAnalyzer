import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Register/Login";
import Register from "./Pages/Register/Register";
import Start from "./Pages/Onboarding/Start";
import Start2 from "./Pages/Onboarding/Start2";
import Home from "./Pages/Home";
import UserProtectWrapper from "./Pages/Register/UserProtectWrapper";
// import Logout from './Pages/Logout'
import Start3 from "./Pages/Onboarding/Start3";
import Start4 from "./Pages/Onboarding/Start4";
import Start5 from "./Pages/Onboarding/Start5";
// import Goal from './Pages/Onboarding/Goal'
// import Goal2 from './Pages/Onboarding/Goal2'
// import Goal3 from './Pages/Onboarding/Goal3'
import Welcome from "./Pages/Onboarding/Welcome";
import Notification from "./Pages/Notification";
import Profile from "./Pages/HomeFooter/Profile";
import Meal from "./Pages/HomeFooter/Meal";



// import Alarm from './Pages/Sleep/Alarm'
// import SleepTracker from "./Pages/Sleep/SleepTracker";
import Workout from "./Pages/HomeFooter/Workout";
import ActivityTracker from "./Pages/ActivityTracker";
// import { ThemeProvider } from './Context/ThemeContext'
import Fitness from "./Pages/Advices/Fitness";
import Nutrition from "./Pages/Advices/Nutrition";
import Selfcare from "./Pages/Advices/Selfcare";
import Wellness from "./Pages/Advices/Wellness";
import FitnessArticle from "./Components/Advice/Fitness/FitnessArticle";
import Fit2Article from "./Components/Advice/Fitness/Fit2Article";
import Fit3Article from "./Components/Advice/Fitness/Fit3Article";
import Fit4Article from "./Components/Advice/Fitness/Fit4Article";
import Fit5Article from "./Components/Advice/Fitness/Fit5Article";
import Fit6Article from "./Components/Advice/Fitness/Fit6Article";
import Fit7Article from "./Components/Advice/Fitness/Fit7Article";
import Fit8Article from "./Components/Advice/Fitness/Fit8Article";
import Fit9Article from "./Components/Advice/Fitness/Fit9Article";
import Fit10Article from "./Components/Advice/Fitness/Fit10Article";
import Nutrition1 from "./Components/Advice/Nutrition/Nutrition1";
import Nutrition2 from "./Components/Advice/Nutrition/Nutrition2";
import Nutrition3 from "./Components/Advice/Nutrition/Nutrition3";
import Nutrition4 from "./Components/Advice/Nutrition/Nutrition4";
import Nutrition5 from "./Components/Advice/Nutrition/Nutrition5";
import Nutrition6 from "./Components/Advice/Nutrition/Nutrition6";
import Nutrition7 from "./Components/Advice/Nutrition/Nutrition7";
import Nutrition8 from "./Components/Advice/Nutrition/Nutrition8";
import Nutrition9 from "./Components/Advice/Nutrition/Nutrition9";
import Nutrition10 from "./Components/Advice/Nutrition/Nutrition10";
import Selfcare1 from "./Components/Advice/Selfcare/Selfcare1";
import Selfcare2 from "./Components/Advice/Selfcare/Selfcare2";
import Selfcare3 from "./Components/Advice/Selfcare/Selfcare3";
import Selfcare4 from "./Components/Advice/Selfcare/Selfcare4";
import Selfcare5 from "./Components/Advice/Selfcare/Selfcare5";
import Selfcare6 from "./Components/Advice/Selfcare/Selfcare6";
import Selfcare7 from "./Components/Advice/Selfcare/Selfcare7";
import Wellness1 from "./Components/Advice/Wellness/Wellness1";
import Wellness2 from "./Components/Advice/Wellness/Wellness2";
import Wellness3 from "./Components/Advice/Wellness/Wellness3";
import Wellness4 from "./Components/Advice/Wellness/Wellness4";
import Wellness5 from "./Components/Advice/Wellness/Wellness5";
import Wellness6 from "./Components/Advice/Wellness/Wellness6";
import Wellness7 from "./Components/Advice/Wellness/Wellness7";
import Wellness8 from "./Components/Advice/Wellness/Wellness8";
import Wellness9 from "./Components/Advice/Wellness/Wellness9";
import Wellness10 from "./Components/Advice/Wellness/Wellness10";
import Wellness11 from "./Components/Advice/Wellness/Wellness11";
import Chatbot from "./components/Chatbot";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import MusicHome from "./Pages/Musics/MusicHome";
import GPSTracker from "./Pages/GpsTracker";
import Body from "./Components/Progress/Body";
import Contact from "./Components/Contact";
import NotFound from "./Components/NotFound";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsOfUse from "./Components/TermsOfUse";
import SocialFeed from "./Components/Community/SocialFeed";
// import PostCard from "./Components/Social/PostCard";
import SocialFeeds from "./Components/Community/SocialFeeds";
import Challenges from "./Components/Community/Challenges";


// import { div } from 'motion/react-client'

const App = () => {
  const location = useLocation();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("spotifyToken") || ""
  );
  // Hide Chatbot on these pages
  const hiddenRoutes = [
    "/",
    "/start2",
    "/start3",
    "/start4",
    "/start5",
    "/login",
    "/register",
    "/welcome",
  ];
  const shouldShowChatbot = !hiddenRoutes.includes(location.pathname);
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

     

        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/meal" element={<Meal />} />
        <Route path="/musichome" element={<MusicHome />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse/>} />
        <Route path="/socialfeed" element={<SocialFeed/>} />
        <Route path="/social" element={<SocialFeeds/>} />
        {/* <Route path="/posts" element={<PostCard/>} /> */}
        <Route path="/challenges" element={<Challenges/>} />






     

        <Route path="/workout" element={<Workout />} />
        {/* <Route path="/alarm" element={<Alarm />} /> */}
        {/* <Route path="/sleeptracker" element={<SleepTracker />} /> */}
        <Route path="/activity-tracker" element={<ActivityTracker />} />

        <Route path="/gpstracker" element={<GPSTracker />} />
        <Route path="/progress" element={<Body />} />
        <Route path="/404" element={<NotFound />} />
        
      

        <Route path="/fitness" element={<Fitness />} />
        <Route path="/article" element={<FitnessArticle />} />
        <Route path="/article2" element={<Fit2Article />} />
        <Route path="/article3" element={<Fit3Article />} />
        <Route path="/article4" element={<Fit4Article />} />
        <Route path="/article5" element={<Fit5Article />} />
        <Route path="/article6" element={<Fit6Article />} />
        <Route path="/article7" element={<Fit7Article />} />
        <Route path="/article8" element={<Fit8Article />} />
        <Route path="/article9" element={<Fit9Article />} />
        <Route path="/article10" element={<Fit10Article />} />

        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/nut-article" element={<Nutrition1 />} />
        <Route path="/nut-article2" element={<Nutrition2 />} />
        <Route path="/nut-article3" element={<Nutrition3 />} />
        <Route path="/nut-article4" element={<Nutrition4 />} />
        <Route path="/nut-article5" element={<Nutrition5 />} />
        <Route path="/nut-article6" element={<Nutrition6 />} />
        <Route path="/nut-article7" element={<Nutrition7 />} />
        <Route path="/nut-article8" element={<Nutrition8 />} />
        <Route path="/nut-article9" element={<Nutrition9 />} />
        <Route path="/nut-article10" element={<Nutrition10 />} />

        <Route path="/selfcare" element={<Selfcare />} />
        <Route path="/selfcare1" element={<Selfcare1 />} />
        <Route path="/selfcare2" element={<Selfcare2 />} />
        <Route path="/selfcare3" element={<Selfcare3 />} />
        <Route path="/selfcare4" element={<Selfcare4 />} />
        <Route path="/selfcare5" element={<Selfcare5 />} />
        <Route path="/selfcare6" element={<Selfcare6 />} />
        <Route path="/selfcare7" element={<Selfcare7 />} />

        <Route path="/wellness" element={<Wellness />} />
        <Route path="/wellness1" element={<Wellness1 />} />
        <Route path="/wellness2" element={<Wellness2 />} />
        <Route path="/wellness3" element={<Wellness3 />} />
        <Route path="/wellness4" element={<Wellness4 />} />
        <Route path="/wellness5" element={<Wellness5 />} />
        <Route path="/wellness6" element={<Wellness6 />} />
        <Route path="/wellness7" element={<Wellness7 />} />
        <Route path="/wellness8" element={<Wellness8 />} />
        <Route path="/wellness9" element={<Wellness9 />} />
        <Route path="/wellness10" element={<Wellness10 />} />
        <Route path="/wellness11" element={<Wellness11 />} />
        {/* <Route path='/wellness12' element={<Wellness12 />} />   */}

        {/* <Route path="logout" element={
          <UserProtectWrapper>
            <Logout />
          </UserProtectWrapper>
        } /> */}
      </Routes>

     

      {/* Show Chatbot only on allowed pages */}
      {shouldShowChatbot && <Chatbot />}
      {/* </ThemeProvider> */}
    </>
  );
};

export default App;
