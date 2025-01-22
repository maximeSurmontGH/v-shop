"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  date: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
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
      <p className="mx-1 w-24 bg-white py-3 text-center" key={interval}>
        {timeLeft[interval].toString().padStart(2, "0")}
      </p>,
    );
  });

  return (
    <div>
      <div className="fex-row relative flex text-6xl font-bold text-slate-800">
        {timerComponents}
        <div className="absolute inset-y-1/2 w-full border border-slate-800"></div>
      </div>
      <div className="text-l fex-row relative flex pt-2 font-bold text-white">
        <p className="mx-1 w-24">jours</p>
        <p className="mx-1 w-24">heures</p>
        <p className="mx-1 w-24">minutes</p>
        <p className="mx-1 w-24">secondes</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
