import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../lib/store";

export interface ScoreState {
  value: number;
}

const initialState: ScoreState = {
  value: 0,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { incrementByAmount, setScore } = scoreSlice.actions;

export default scoreSlice.reducer;

export const selectScore = (state: RootState) => state.score.value;
