import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../lib/store";

export interface ScoreState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: ScoreState = {
  value: 0,
  status: "idle",
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { incrementByAmount } = scoreSlice.actions;

export default scoreSlice.reducer;

export const selectScore = (state: RootState) => state.score.value;
