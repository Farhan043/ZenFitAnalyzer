// import { io } from "socket.io-client";
// import { useState, useEffect } from "react";

// const socket = io("https://zenfitanalyzer-27fd.onrender.com");
const Notification = () => {
  // const [notifications, setNotifications] = useState([]);


  // useEffect(() => {
  //   socket.on("waterUpdate", (data) => {
  //     setNotifications((prev) => [...prev, data.message]);
  //   });

  //   return () => {
  //     socket.off("waterUpdate");
  //   };
  // }, []);
  return (
    <div>
      <h3>Notification</h3>
      {/* <ul>
          {notifications.map((notif, index) => (
            <li key={index}>{notif}</li>
          ))}
        </ul> */}
    </div>
  )
}

export default Notification