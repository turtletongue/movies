import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import ErrorAlert from "../../components/error-alert/error-alert.component";
import MoviesTable from "../../components/movies-table/movies-table.component";
import Pagination from "../../components/pagination/pagination.component";
import {
  useFetchMoviesData,
  useMoviesData,
  usePagination,
} from "../../redux/hooks";
import ErrorBoundary from "../error-boundary/error-boundary.container";
import Errors from "../errors/errors.container";
import PageContainer from "../page-container/page-container.container";
import PageContent from "../page-content/page-content.container";

const App = () => {
  const { currentPage } = usePagination();
  const fetchMoviesData = useFetchMoviesData();
  const { movies, moviesFetchError, isLoading, totalCountOfMovies } =
    useMoviesData();

  useEffect(() => {
    fetchMoviesData(currentPage);
  }, [currentPage, fetchMoviesData]);

  if (moviesFetchError)
    return (
      <Errors>
        <ErrorAlert>
          There was an error fetching your movies. Try again later.
        </ErrorAlert>
      </Errors>
    );

  return (
    <ErrorBoundary>
      <PageContainer>
        {isLoading === "idle" ? (
          <PageContent>
            <MoviesTable movies={movies} />
            <Pagination totalCountOfMovies={totalCountOfMovies} />
          </PageContent>
        ) : (
          <Spinner size="xl" />
        )}
      </PageContainer>
    </ErrorBoundary>
  );
};

export default App;
