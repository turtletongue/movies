import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Box, Center, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect, useState } from "react";
import ErrorBoundary from "../../components/error-boundary/error-boundary.component";
import MoviesTable from "../../components/movies-table/movies-table.component";
import Pagination from "../../components/pagination/pagination.component";
import Movie from "../../interfaces/Movie";
import MovieWithoutComments from "../../interfaces/MovieWithoutComments";
import fetchMoviesData from "../../utils/fetchMoviesData";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCountOfMovies, setTotalCountOfMovies] = useState(0);
  const [error, setError] = useState();
  useEffect(() => {
    setIsLoading(true);
    fetchMoviesData(currentPage)
      .then((moviesData) => {
        setTotalCountOfMovies(moviesData.movie_count);
        setMovies(
          moviesData.movies.map((movie: MovieWithoutComments) => {
            const comments = JSON.parse(
              localStorage.getItem(movie.id.toString()) || "[]"
            );
            return { ...movie, comments };
          })
        );
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [currentPage]);
  if (error)
    return (
      <VStack spacing={2} padding="1rem">
        <Alert status="error">
          <AlertIcon />
          There was an error fetching your movies. Try again later.
        </Alert>
      </VStack>
    );
  return (
    <ErrorBoundary>
      <Center width="100%" minHeight="100vh">
        {!isLoading ? (
          <Box width="100%">
            <MoviesTable movies={movies} handleMoviesChange={setMovies} />
            <Pagination
              currentPage={currentPage}
              totalCountOfMovies={totalCountOfMovies}
              handlePageChange={setCurrentPage}
            />
          </Box>
        ) : (
          <Spinner size="xl" />
        )}
      </Center>
    </ErrorBoundary>
  );
};

export default App;
