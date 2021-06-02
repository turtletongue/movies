import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PaginationState {
  currentPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { changeCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
