import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../lib/store";

export interface ScoreState {
  value: number;
  loading: boolean;
}

const initialState: ScoreState = {
  value: 0,
  loading: false,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    toggleScoreLoading: (state) => {
      state.loading = !state.loading;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { incrementByAmount, toggleScoreLoading, setScore } =
  scoreSlice.actions;

export default scoreSlice.reducer;

export const selectScore = (state: RootState) => state.score.value;
export const selectScoreLoading = (state: RootState) => state.score.loading;
