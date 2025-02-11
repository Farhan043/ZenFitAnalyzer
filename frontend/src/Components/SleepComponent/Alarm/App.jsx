import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TodaySchedule from "./Pages/TodaySchedule";
import useAlarm from "../Alarm/useAlarm";

const App = () => {
  const { audioRef } = useAlarm();

  return (
    <Router>
      <audio ref={audioRef} src="/alarm-sound.mp3" preload="auto"></audio>
      <Switch>
        <Route path="/today-schedule" component={TodaySchedule} />
        {/* Other routes */}
      </Switch>
    </Router>
  );
};

export default App;