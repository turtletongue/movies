import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ROWS_IN_PAGE_LIMIT } from "../../constants";
import Movie from "../../interfaces/Movie";
import MovieWithoutComments from "../../interfaces/MovieWithoutComments";

export interface MoviesDataState {
  movies: Movie[];
  isLoading: "idle" | "loading";
  totalCountOfMovies: number;
  error?: Error;
}

const initialState: MoviesDataState = {
  movies: [],
  isLoading: "idle",
  totalCountOfMovies: 0,
};

interface MoviesData {
  movie_count: number;
  movies: MovieWithoutComments[];
}

export const fetchMoviesData = createAsyncThunk<
  MoviesData,
  number,
  { rejectValue: Error }
>("moviesData/fetchMoviesDataStatus", async (page: number, thunkAPI) => {
  const response = await fetch(
    `https://yts.mx/api/v2/list_movies.json?limit=${ROWS_IN_PAGE_LIMIT}&page=${page}`
  );
  const moviesJSON = await response.json();
  if (moviesJSON.status !== "ok")
    return thunkAPI.rejectWithValue(
      new Error("Error occured while movies was fetched.")
    );
  return moviesJSON.data as MoviesData;
});

const moviesSlice = createSlice({
  name: "moviesData",
  initialState,
  reducers: {
    appendComment: (
      state,
      action: PayloadAction<{ movieId: number; content: string }>
    ) => {
      const { movieId, content } = action.payload;
      const movie = state.movies.find((movie) => movie.id === movieId);
      if (!movie) return;
      movie.comments.push({
        id: (movie.comments[movie.comments.length - 1]?.id || 0) + 1,
        content,
      });
      localStorage.setItem(movieId.toString(), JSON.stringify(movie.comments));
    },
    deleteComment: (
      state,
      action: PayloadAction<{ movieId: number; commentId: number }>
    ) => {
      const { movieId, commentId } = action.payload;
      const movie = state.movies.find((movie) => movie.id === movieId);
      if (!movie) return;
      movie.comments = movie.comments.filter(
        (comment) => comment.id !== commentId
      );
      localStorage.setItem(movieId.toString(), JSON.stringify(movie.comments));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoviesData.fulfilled, (state, { payload }) => {
      state.isLoading = "idle";
      state.movies = payload.movies.map((movie) => {
        const comments = JSON.parse(
          localStorage.getItem(movie.id.toString()) || "[]"
        );
        return { ...movie, comments };
      });
      state.totalCountOfMovies = payload.movie_count;
    });

    builder.addCase(fetchMoviesData.rejected, (state, { payload }) => {
      state.isLoading = "idle";
      state.error = payload;
    });

    builder.addCase(fetchMoviesData.pending, (state) => {
      state.isLoading = "loading";
    });
  },
});

export const { appendComment, deleteComment } = moviesSlice.actions;
export default moviesSlice.reducer;
