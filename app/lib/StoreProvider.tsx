"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { incrementByAmount } from "../features/score/score.slice";
import { Item } from "../model/item.model";
import { setItems } from "../features/items/items.slice";

export default function StoreProvider({
  children,
  score,
  items,
}: {
  children: React.ReactNode;
  score: number;
  items: Item[];
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(incrementByAmount(score));
    storeRef.current.dispatch(setItems(items));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
