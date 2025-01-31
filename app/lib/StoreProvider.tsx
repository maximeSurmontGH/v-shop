"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { incrementByAmount } from "../features/score/score.slice";
import { Item } from "./model/item.model";
import { setItems } from "../features/items/items.slice";
import { Notification } from "./model/notification.model";
import { setNotifications } from "../features/notifications/notifications.slice";

export default function StoreProvider({
  children,
  score,
  items,
  notifications,
}: {
  children: React.ReactNode;
  score: number;
  items: Item[];
  notifications: Notification[];
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(incrementByAmount(score));
    storeRef.current.dispatch(setItems(items));
    storeRef.current.dispatch(setNotifications(notifications));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
