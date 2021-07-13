// time component to display tier , i.e. how much time you have spent in meeting

import React from "react";

const msToTime = ms => {
  const msPerSecond = 1000;
  const msPerMinute = msPerSecond * 60;
  const msPerHour = msPerMinute * 60;

  const hours = Math.floor(ms / msPerHour);
  const hoursRest = ms % msPerHour;
  const minutes = Math.floor(hoursRest / msPerMinute);
  const minutesRest = hoursRest % msPerMinute;
  const seconds = Math.floor(minutesRest / msPerSecond);
  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
};

const Time = ({ ms }) => {
  return (
    <div className="time-container">
      <div className="time-inner-container">
        <div className="time-digits">{msToTime(ms)}</div>
        <div className="time-text">
         
        </div>
      </div>
    </div>
  );
};

export default Time;
