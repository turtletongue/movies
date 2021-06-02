import { configureStore } from "@reduxjs/toolkit";
import moviesDataReducer from "./movies-data/movies-data.slice";
import moviesTableReducer from "./movies-table/movies-table.slice";
import paginationReducer from "./pagination/pagination.slice";

const store = configureStore({
  reducer: {
    moviesData: moviesDataReducer,
    pagination: paginationReducer,
    moviesTable: moviesTableReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
