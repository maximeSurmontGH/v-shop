"use client";

import { useAppSelector } from "../../../lib/hooks";
import { selectNotifications } from "../notifications.slice";
import Notification from "../Notification";

const ItemRows: React.FC<object> = () => {
  const notifications = useAppSelector(selectNotifications);

  return (
    <div>
      {notifications.map((notification, index) => (
        <div className="mt-3" key={index}>
          <Notification {...notification} />
        </div>
      ))}
    </div>
  );
};

export default ItemRows;
