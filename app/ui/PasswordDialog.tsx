"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";
import { isPasswordValid } from "../lib/password";

// I do not recommend storing passwords in plain text in the code. :D
export const EXPECTED_PASSWORD = "v === <3";

interface PasswordDialogProps {
  onClose: () => void;
  onPasswordValid: () => void;
}

const PasswordDialog: React.FC<PasswordDialogProps> = ({
  onClose,
  onPasswordValid,
}) => {
  const [password, setPassword] = useState<string>("");
  const [displayIncorrectPasswordAlert, setDisplayIncorrectPasswordAlert] =
    useState<boolean | null>(null);

  const validatePasswordOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      validatePassword();
    }
  };

  const updatePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setDisplayIncorrectPasswordAlert(null);
  };

  const validatePassword = () => {
    if (!isPasswordValid(password)) {
      setDisplayIncorrectPasswordAlert(true);
    } else {
      localStorage.setItem("password", password);
      onPasswordValid();
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
                    Entrez le mot de passe
                  </h3>
                  <div className="mt-2">
                    <input
                      type="password"
                      value={password}
                      onChange={updatePassword}
                      onKeyDown={validatePasswordOnEnter}
                      className="focus:shadow-outline mb-1 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    />
                    {displayIncorrectPasswordAlert ? (
                      <p className="text-xs italic text-red-500">
                        Mot de passe incorrect
                      </p>
                    ) : (
                      <p className="text-xs italic text-gray-700">
                        Le mooot de passe
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={validatePassword}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Valider le mot de passe
              </button>
              <button
                type="button"
                data-autofocus
                onClick={goBackToShop}
                className="mr-2 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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

export default PasswordDialog;
