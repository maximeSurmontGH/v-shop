import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../lib/store";
import type { Item } from "@/app/lib/model/item.model";

export interface ItemState {
  value: Item[];
}

const initialState: ItemState = {
  value: [],
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.value = action.payload;
    },
    toggleItemLoading: (state, action: PayloadAction<{ id: string }>) => {
      state.value = state.value.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, loading: !item.loading };
        } else {
          return item;
        }
      });
    },
    stockMinusOne: (state, action: PayloadAction<{ id: string }>) => {
      state.value = state.value.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, stock: item.stock - 1 };
        } else {
          return item;
        }
      });
    },
  },
});

export const { setItems, toggleItemLoading, stockMinusOne } =
  itemsSlice.actions;

export default itemsSlice.reducer;

export const selectItems = (state: RootState) => state.items.value;
