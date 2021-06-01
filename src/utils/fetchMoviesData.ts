import { ROWS_IN_PAGE_LIMIT } from "../constants";

const fetchMoviesData = async (page: number) => {
  const response = await fetch(
    `https://yts.mx/api/v2/list_movies.json?limit=${ROWS_IN_PAGE_LIMIT}&page=${page}`
  );
  const moviesJSON = await response.json();
  if (moviesJSON.status !== "ok")
    throw new Error("Error occured while movies was fetched.");
  return moviesJSON.data;
};

export default fetchMoviesData;
