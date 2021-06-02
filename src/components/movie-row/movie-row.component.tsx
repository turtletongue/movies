import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Tr } from "@chakra-ui/table";
import Movie from "../../interfaces/Movie";
import MovieCellText from "../movie-cell-text/movie-cell-text.components";
import MovieCell from "../movie-cell/movie-cell.component";

interface MovieRowProps {
  index: number;
  movie: Movie;
  onCommentShow: (id: number) => void;
}

const MovieRow = ({ index, movie, onCommentShow }: MovieRowProps) => {
  const [isGreaterThan920] = useMediaQuery("(min-width: 920px)");
  return (
    <Tr borderTop={index !== 0 ? "1px solid #7b7b7b" : "none"}>
      <MovieCell maxHeight="19rem">
        {!isGreaterThan920 && <Text fontWeight={600}>Poster</Text>}
        <Image src={movie.medium_cover_image} alt={movie.title} width="11rem" />
      </MovieCell>
      <MovieCell>
        {!isGreaterThan920 && <Text fontWeight={600}>Title</Text>}
        <MovieCellText>{movie.title}</MovieCellText>
      </MovieCell>
      <MovieCell>
        {!isGreaterThan920 && <Text fontWeight={600}>Genres</Text>}
        <MovieCellText>{movie.genres.join(", ")}</MovieCellText>
      </MovieCell>
      <MovieCell>
        {!isGreaterThan920 && <Text fontWeight={600}>Synopsis</Text>}
        <MovieCellText textAlign="justify">{movie.synopsis}</MovieCellText>
      </MovieCell>
      <MovieCell alignItems="center">
        {!isGreaterThan920 && <Text fontWeight={600}>Comments</Text>}
        <Button onClick={() => onCommentShow(movie.id)}>Show</Button>
      </MovieCell>
    </Tr>
  );
};

export default MovieRow;
