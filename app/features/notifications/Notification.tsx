"use client";

import { setNotificationAsReadInDb } from "../../server-actions/score-actions";
import { useAppDispatch } from "../../lib/hooks";
import { Notification } from "@/app/lib/model/notification.model";
import {
  setNotificationAsRead,
  toggleNotificationLoading,
} from "./notifications.slice";
import Loading from "../loading/Loading";

const NotificationComponent: React.FC<Notification> = ({
  id,
  content,
  loading,
}) => {
  const dispatch = useAppDispatch();

  const setAsRead = async () => {
    dispatch(toggleNotificationLoading({ id }));
    await setNotificationAsReadInDb(id);
    dispatch(setNotificationAsRead({ id }));
    dispatch(toggleNotificationLoading({ id }));
  };

  return (
    <button
      onClick={setAsRead}
      className="flex w-full flex-row items-center justify-between rounded-lg bg-white p-1 shadow-md-l shadow-v-clear-blue hover:bg-gray-200 hover:shadow-md-l-hover hover:shadow-v-clear-blue"
    >
      <span className="mx-1 text-slate-800">{content}</span>

      <div className="rounded-full bg-slate-800 px-4 py-2 text-white">
        {loading ? (
          <Loading />
        ) : (
          <span className="flex flex-row items-center font-bold">Fait</span>
        )}
      </div>
    </button>
  );
};

export default NotificationComponent;
