
import LastNightSleep from '../../Components/SleepComponent/LastNightSleep';
import Navbar from '../../Components/SleepComponent/Navbar';
import SleepScheduleButton from '../../Components/SleepComponent/SleepScheduleButton';
import AlarmAndBedtime from '../../Components/SleepComponent/AlarmAndBedtime';

const Sleeps = () => {
  return (
    <div>
      <Navbar />
      <LastNightSleep />
      <SleepScheduleButton />
      <AlarmAndBedtime />
    </div>
  );
};

export default Sleeps;
