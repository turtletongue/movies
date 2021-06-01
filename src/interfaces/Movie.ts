import Comment from "./Comment";
import MovieWithoutComments from "./MovieWithoutComments";

interface Movie extends MovieWithoutComments {
  comments: Comment[];
}

export default Movie;
