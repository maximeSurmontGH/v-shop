import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "../features/score/score.slice";
import itemsReducer from "../features/items/items.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      score: scoreReducer,
      items: itemsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
