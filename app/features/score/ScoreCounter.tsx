"use client";

import Image from "next/image";
import { useState } from "react";
import PasswordDialog from "../../auth/PasswordDialog";
import ScoreUpdateDialog from "./update/ScoreUpdateDialog";
import { isPasswordValid } from "../../lib/password";
import { selectScore } from "./score.slice";
import { useAppSelector } from "../../lib/hooks";

const ScoreCounter: React.FC<object> = () => {
  const score = useAppSelector(selectScore);

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
        <div className="shadow-v-clear-purple shadow-md-l hover:shadow-md-l-hover hover:shadow-v-clear-purple flex flex-row items-center rounded-full bg-white p-1 hover:bg-gray-200">
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
        <ScoreUpdateDialog onClose={() => setOpenScoreUpdateDialog(false)} />
      )}
    </div>
  );
};

export default ScoreCounter;
