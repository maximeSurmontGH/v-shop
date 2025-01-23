import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../lib/store";
import type { Item } from "@/app/lib/model/item.model";

export interface ItemState {
  value: Item[];
  status: "idle" | "loading" | "failed";
}

const initialState: ItemState = {
  value: [],
  status: "idle",
};

export const itemsSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;

export const selectItems = (state: RootState) => state.items.value;
