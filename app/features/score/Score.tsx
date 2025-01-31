"use client";

import { useState } from "react";
import { isPasswordValid } from "../../lib/password";
import { selectScore, selectScoreLoading } from "./score.slice";
import { useAppSelector } from "../../lib/hooks";
import Image from "next/image";
import PasswordDialog from "../../auth/PasswordDialog";
import ScoreUpdateDialog from "./update/ScoreUpdateDialog";
import Loading from "../loading/Loading";

const ScoreComponent: React.FC<object> = () => {
  const score = useAppSelector(selectScore);
  const scoreLoading = useAppSelector(selectScoreLoading);

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
        <div className="rounded-full bg-white p-1 shadow-md-l shadow-v-clear-purple hover:bg-gray-200 hover:shadow-md-l-hover hover:shadow-v-clear-purple">
          {scoreLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-row items-center">
              <span className="ml-5 font-bold text-slate-800">{score}</span>
              <Image
                src="/v-bucks.webp"
                alt="V-Bucks icon"
                width={40}
                height={40}
                priority
              />
            </div>
          )}
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

export default ScoreComponent;
