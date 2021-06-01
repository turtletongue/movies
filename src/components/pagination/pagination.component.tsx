import { Button } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import { ROWS_IN_PAGE_LIMIT } from "../../constants";

interface PaginationProps {
  currentPage: number;
  totalCountOfMovies: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalCountOfMovies,
  handlePageChange,
}: PaginationProps) => {
  const FIRST_PAGE = 1;
  const lastPage = Math.ceil(totalCountOfMovies / ROWS_IN_PAGE_LIMIT);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  return (
    <HStack spacing={2} margin="0.5rem">
      {currentPage > 1 && (
        <Button onClick={() => handlePageChange(FIRST_PAGE)}>
          {FIRST_PAGE}
        </Button>
      )}
      {currentPage > 2 && (
        <Button onClick={() => handlePageChange(previousPage)}>
          {previousPage}
        </Button>
      )}
      <Button onClick={() => handlePageChange(currentPage)} colorScheme="teal">
        {currentPage}
      </Button>
      {currentPage < lastPage - 1 && (
        <Button onClick={() => handlePageChange(nextPage)}>{nextPage}</Button>
      )}
      {currentPage < lastPage && (
        <Button onClick={() => handlePageChange(lastPage)}>{lastPage}</Button>
      )}
    </HStack>
  );
};

export default Pagination;
