import React, { useEffect, useRef, useState } from "react";

function DateCounter() {
  const [timerDays, setTimeDays] = useState<string | number>("00");
  const [timerHours, setTimerHours] = useState<string | number>("00");
  const [timerMinutes, setTimerMinutes] = useState<string | number>("00");
  const [timerSeconds, setTimerSeconds] = useState<string | number>("00");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    // Set countdown to 30 days from now for demo purposes
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 30);

    intervalRef.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      } else {
        setTimeDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <div id="timer">
        <div className="countdate">
          <p>{timerDays}</p>
          <span>Days</span>
        </div>
        <div className="countdate">
          <p>{timerHours}</p>
          <span>Hours</span>
        </div>
        <div className="countdate">
          <p>{timerMinutes}</p>
          <span>Minutes</span>
        </div>
        <div className="countdate">
          <p>{timerSeconds}</p>
          <span>Seconds</span>
        </div>
      </div>
    </>
  );
}

export default DateCounter;
