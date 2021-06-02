import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  appendComment,
  deleteComment,
  fetchMoviesData,
} from "./movies-data/movies-data.slice";
import {
  changeCommentInputText,
  changeSelectedMovieId,
} from "./movies-table/movies-table.slice";
import { changeCurrentPage } from "./pagination/pagination.slice";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useMoviesData = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.moviesData.movies);
  const isLoading = useAppSelector((state) => state.moviesData.isLoading);
  const totalCountOfMovies = useAppSelector(
    (state) => state.moviesData.totalCountOfMovies
  );
  const moviesFetchError = useAppSelector((state) => state.moviesData.error);

  const addComment = (movieId: number, content: string) => {
    dispatch(appendComment({ movieId, content }));
  };

  const removeComment = (movieId: number, commentId: number) => {
    dispatch(deleteComment({ movieId, commentId }));
  };

  return {
    movies,
    isLoading,
    totalCountOfMovies,
    moviesFetchError,
    addComment,
    removeComment,
  };
};

let fetchMovies: ((page: number) => Promise<void>) | null = null;

export const useFetchMoviesData = () => {
  const dispatch = useAppDispatch();

  if (fetchMovies) return fetchMovies;

  fetchMovies = async (page: number) => {
    await dispatch(fetchMoviesData(page));
  };

  return fetchMovies;
};

export const usePagination = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.pagination.currentPage);

  const setCurrentPage = (page: number) => {
    dispatch(changeCurrentPage(page));
  };

  return {
    currentPage,
    setCurrentPage,
  };
};

export const useMoviesTable = () => {
  const dispatch = useAppDispatch();
  const selectedMovieId = useAppSelector(
    (state) => state.moviesTable.selectedMovieId
  );
  const commentInputText = useAppSelector(
    (state) => state.moviesTable.commentInputText
  );

  const setSelectedMovieId = (id: number) => {
    dispatch(changeSelectedMovieId(id));
  };

  const setCommentInputText = (text: string) => {
    dispatch(changeCommentInputText(text));
  };

  return {
    selectedMovieId,
    commentInputText,
    setSelectedMovieId,
    setCommentInputText,
  };
};
