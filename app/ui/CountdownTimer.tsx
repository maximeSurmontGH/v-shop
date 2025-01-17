"use client";

import * as React from "react";

interface CountdownTimerProps {
  date: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ date }) => {
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date(date) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents: React.JSX.Element[] = [];

  (
    ["days", "hours", "minutes", "seconds"] as (keyof typeof timeLeft)[]
  ).forEach((interval) => {
    timerComponents.push(
      <span className="mx-1 bg-white p-1" key={interval}>
        {timeLeft[interval].toString().padStart(2, "0")}
      </span>,
    );
  });

  return (
    <div className="relative text-6xl font-bold text-slate-800">
      {timerComponents.length ? timerComponents : <span>Time is up!</span>}
      <div className="absolute inset-y-1/2 w-full border border-slate-800"></div>
    </div>
  );
};

export default CountdownTimer;
