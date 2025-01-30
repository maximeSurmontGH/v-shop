"use client";

import { useAppSelector } from "../../../lib/hooks";
import { selectNotifications } from "../notifications.slice";
import Notification from "../Notification";

const ItemRows: React.FC<object> = () => {
  const notifications = useAppSelector(selectNotifications);

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

export default ItemRows;
