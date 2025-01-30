"use client";

import { useAppSelector } from "../../../lib/hooks";
import { selectNotificationsNotRead } from "../notifications.slice";
import { useEffect, useState } from "react";
import { EXPECTED_PASSWORD } from "@/app/auth/PasswordDialog";
import Notification from "../Notification";

const NotificationsListComponent: React.FC<object> = () => {
  const notifications = useAppSelector(selectNotificationsNotRead);

  const [isAuthentified, setIsAuthentified] = useState<boolean>(false);

  useEffect(() => {
    const passwordFromLocalStorage = localStorage.getItem("password");
    const isPasswordValid = (password: string) =>
      password === EXPECTED_PASSWORD;
    setIsAuthentified(
      Boolean(
        passwordFromLocalStorage && isPasswordValid(passwordFromLocalStorage),
      ),
    );
  }, []);

  if (!isAuthentified) {
    return;
  }

  return (
    <div>
      <p>Demandes de Vidal : </p>
      <div>
        {notifications.map((notification, index) => (
          <div className="mt-3" key={index}>
            <Notification {...notification} />
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="mt-5 flex w-full flex-row items-center justify-between rounded-lg bg-white p-1 shadow-md-l shadow-v-clear-blue hover:bg-gray-200 hover:shadow-md-l-hover hover:shadow-v-clear-blue">
            <span className="mx-1 text-slate-800">Aucune demande 👌</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsListComponent;
