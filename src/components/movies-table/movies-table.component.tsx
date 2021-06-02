import { useDisclosure } from "@chakra-ui/hooks";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Table, Tbody } from "@chakra-ui/table";
import { useMemo } from "react";
import Movie from "../../interfaces/Movie";
import { useMoviesData, useMoviesTable } from "../../redux/hooks";
import CommentsModal from "../comments-modal/comments-modal.component";
import MovieRow from "../movie-row/movie-row.component";
import TableHead from "../table-head/table-head.component";
import "./movies-table.styles.css";

interface MoviesTableProps {
  movies: Movie[];
}

const MoviesTable = ({ movies }: MoviesTableProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isGreaterThan920] = useMediaQuery("(min-width: 920px)");
  const { addComment, removeComment } = useMoviesData();

  const {
    selectedMovieId,
    setSelectedMovieId,
    commentInputText,
    setCommentInputText,
  } = useMoviesTable();

  const selectedMovie = useMemo(
    () => movies.find((movie) => movie.id === selectedMovieId),
    [selectedMovieId, movies]
  );

  const onCommentShow = (id: number) => {
    setSelectedMovieId(id);
    onOpen();
  };

  const onCommentAdd = () => {
    if (commentInputText.trim() === "") return;
    addComment(selectedMovieId, commentInputText);
    setCommentInputText("");
  };

  const onCommentRemove = (commentId: number) => {
    removeComment(selectedMovieId, commentId);
  };

  return (
    <>
      <Table variant="simple">
        {isGreaterThan920 && <TableHead />}
        <Tbody>
          {movies.map((movie, index) => {
            return (
              <MovieRow
                key={movie.id}
                movie={movie}
                index={index}
                onCommentShow={onCommentShow}
              />
            );
          })}
        </Tbody>
      </Table>
      <CommentsModal
        isOpen={isOpen}
        onClose={onClose}
        selectedMovie={selectedMovie}
        onCommentAdd={onCommentAdd}
        onCommentRemove={onCommentRemove}
      />
    </>
  );
};

export default MoviesTable;
