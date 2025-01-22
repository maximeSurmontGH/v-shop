"use client";

import Image from "next/image";
import { useState } from "react";
import PasswordDialog from "./PasswordDialog";
import ScoreUpdateDialog from "./ScoreUpdateDialog";
import { isPasswordValid } from "../lib/password";

interface ScoreCounterProps {
  score: number;
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({ score }) => {
  const [openScoreUpdateDialog, setOpenScoreUpdateDialog] =
    useState<boolean>(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState<boolean>(false);

  const updateCount = () => {
    const passwordFromLocalStorage = localStorage.getItem("password");
    if (
      !passwordFromLocalStorage ||
      !isPasswordValid(passwordFromLocalStorage)
    ) {
      setOpenPasswordDialog(true);
    } else {
      setOpenScoreUpdateDialog(true);
    }
  };

  const closePasswordDialogAndOpenScoreUpdateDialog = () => {
    setOpenPasswordDialog(false);
    setOpenScoreUpdateDialog(true);
  };

  return (
    <div>
      <button onClick={updateCount}>
        <div className="flex flex-row items-center rounded-full bg-white p-1">
          <span className="ml-5 font-bold text-slate-800">{score}</span>
          <Image
            src="/v-bucks.webp"
            alt="V-Bucks icon"
            width={40}
            height={40}
            priority
          />
        </div>
      </button>
      {openPasswordDialog && (
        <PasswordDialog
          onClose={() => setOpenPasswordDialog(false)}
          onPasswordValid={closePasswordDialogAndOpenScoreUpdateDialog}
        />
      )}
      {openScoreUpdateDialog && (
        <ScoreUpdateDialog
          score={score}
          onClose={() => setOpenScoreUpdateDialog(false)}
        />
      )}
    </div>
  );
};

export default ScoreCounter;
