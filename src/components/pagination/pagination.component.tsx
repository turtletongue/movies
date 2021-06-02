import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, HStack } from "@chakra-ui/react";
import { ROWS_IN_PAGE_LIMIT } from "../../constants";
import { usePagination } from "../../redux/hooks";

interface PaginationProps {
  totalCountOfMovies: number;
}

const Pagination = ({ totalCountOfMovies }: PaginationProps) => {
  const { currentPage, setCurrentPage } = usePagination();
  const FIRST_PAGE = 1;
  const lastPage = Math.ceil(totalCountOfMovies / ROWS_IN_PAGE_LIMIT);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  return (
    <HStack spacing={2} margin="0.5rem" maxWidth="100vw" overflow="hidden">
      <Button
        onClick={() => currentPage > 1 && setCurrentPage(previousPage)}
        aria-label="Previous Page"
      >
        <ArrowBackIcon />
      </Button>
      {currentPage > 1 && (
        <Button onClick={() => setCurrentPage(FIRST_PAGE)}>{FIRST_PAGE}</Button>
      )}
      {currentPage > 2 && (
        <Button onClick={() => setCurrentPage(previousPage)}>
          {previousPage}
        </Button>
      )}
      <Button onClick={() => setCurrentPage(currentPage)} colorScheme="teal">
        {currentPage}
      </Button>
      {currentPage < lastPage - 1 && (
        <Button onClick={() => setCurrentPage(nextPage)}>{nextPage}</Button>
      )}
      {currentPage < lastPage && (
        <Button onClick={() => setCurrentPage(lastPage)}>{lastPage}</Button>
      )}
      <Button
        onClick={() => currentPage < lastPage - 1 && setCurrentPage(nextPage)}
        aria-label="Next Page"
      >
        <ArrowForwardIcon />
      </Button>
    </HStack>
  );
};

export default Pagination;
