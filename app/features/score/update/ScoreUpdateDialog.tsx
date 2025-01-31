"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { updateScoreInDb } from "@/app/server-actions/score-actions";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { selectScore, setScore, toggleScoreLoading } from "../score.slice";

interface ScoreUpdateDialogProps {
  onClose: () => void;
}

const ScoreUpdateDialog: React.FC<ScoreUpdateDialogProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const score = useAppSelector(selectScore);

  const [newScore, setNewScore] = useState<number>(score);

  const updateNewScore = (event: ChangeEvent<HTMLInputElement>) => {
    setNewScore(+event.target.value);
  };

  const validatePasswordOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      validateScore();
    }
  };

  const validateScore = async () => {
    if (newScore !== score) {
      dispatch(toggleScoreLoading());
      await updateScoreInDb(newScore);
      dispatch(setScore(newScore));
      dispatch(toggleScoreLoading());

      onClose();
    }
  };

  const goBackToShop = () => {
    onClose();
  };

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center bg-gray-50/50 p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold text-gray-900">
                    Modification du score
                  </h3>
                  <div className="mt-2">
                    <input
                      type="number"
                      value={newScore}
                      onChange={updateNewScore}
                      onKeyDown={validatePasswordOnEnter}
                      className="focus:shadow-outline mb-1 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    />

                    <p className="text-xs italic text-gray-700">
                      Nouveau score
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={validateScore}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm-l shadow-v-clear-blue ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:shadow-sm-l-hover hover:shadow-v-clear-blue sm:mt-0 sm:w-auto"
              >
                Valider le score
              </button>
              <button
                type="button"
                data-autofocus
                onClick={goBackToShop}
                className="mr-2 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm-l shadow-v-clear-purple ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:shadow-sm-l-hover hover:shadow-v-clear-purple sm:mt-0 sm:w-auto"
              >
                Revenir au shop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreUpdateDialog;
