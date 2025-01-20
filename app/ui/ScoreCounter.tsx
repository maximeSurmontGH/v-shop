"use client";

import Image from "next/image";

import * as React from "react";

interface ScoreCounterProps {
  score: number;
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({ score }) => {
  const updateCount = () => {
    console.log("Not implemented.");
  };

  return (
    <button onClick={updateCount}>
      <div className="flex flex-row items-center justify-center rounded-full bg-white p-1">
        <span className="ml-5 font-bold text-slate-800">{score}</span>
        <Image
          src="/v-bucks.webp"
          alt="V-Shop logo"
          width={40}
          height={40}
          priority
        />
      </div>
    </button>
  );
};

export default ScoreCounter;
