import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FilterSliceState {
  searchValue: string,
}

const initialState : FilterSliceState = {
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
    },
  },
});

export const {
  setCategoryId,
} = filterSlice.actions;

export default filterSlice.reducer;
