import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MoviesTableState {
  selectedMovieId: number;
  commentInputText: string;
}

const initialState: MoviesTableState = {
  selectedMovieId: -1,
  commentInputText: "",
};

const moviesTableSlice = createSlice({
  name: "moviesTable",
  initialState,
  reducers: {
    changeSelectedMovieId: (state, action: PayloadAction<number>) => {
      state.selectedMovieId = action.payload;
    },
    changeCommentInputText: (state, action: PayloadAction<string>) => {
      state.commentInputText = action.payload;
    },
  },
});

export const { changeSelectedMovieId, changeCommentInputText } =
  moviesTableSlice.actions;
export default moviesTableSlice.reducer;
