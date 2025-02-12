import React from 'react'
import Navbar from '../../Components/SleepComponent/Navbar'
import LastNightSleep from '../../Components/SleepComponent/LastNightSleep'
import SleepScheduleButton from '../../Components/SleepComponent/SleepScheduleButton'
import TodaySchedule from '../../Components/SleepComponent/Alarm/TodaySchedule'
import WeeklyChart from '../../Components/SleepComponent/WeeklyChart'

const SleepTracker = () => {
  return (
    <>
     
       <Navbar />
      <WeeklyChart/>
      <LastNightSleep/>
      <SleepScheduleButton />
        <TodaySchedule />
   </>
  )
}

export default SleepTracker