import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { DeleteIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Flex, Text, VStack } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Textarea } from "@chakra-ui/textarea";
import { useState } from "react";
import Comment from "../../interfaces/Comment";
import Movie from "../../interfaces/Movie";

interface MoviesTableProps {
  movies: Movie[];
  handleMoviesChange: (movies: Movie[]) => void;
}

const MoviesTable = ({ movies, handleMoviesChange }: MoviesTableProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isGreaterThan920] = useMediaQuery("(min-width: 920px)");
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [commentInputText, setCommentInputText] = useState("");
  const handleCommentsShow = (movie: Movie) => {
    setSelectedMovie(movie);
    onOpen();
  };
  const handleCommentAdd = () => {
    if (commentInputText.trim() === "") return;
    let updatedComments: Comment[] = [];
    handleMoviesChange(
      movies.map((movie) => {
        if (movie.id === selectedMovie.id) {
          updatedComments = [
            ...movie.comments,
            {
              id: (movie.comments[movie.comments.length - 1]?.id || 0) + 1,
              content: commentInputText,
            },
          ];
          return { ...movie, comments: updatedComments };
        }
        return movie;
      })
    );
    localStorage.setItem(
      selectedMovie.id.toString(),
      JSON.stringify(updatedComments)
    );
    setCommentInputText("");
    onClose();
  };
  const handleCommentDelete = (commentId: number) => {
    let updatedComments: Comment[] = [];
    handleMoviesChange(
      movies.map((movie) => {
        if (movie.id === selectedMovie.id) {
          updatedComments = movie.comments.filter((comment) => {
            return comment.id !== commentId;
          });
          return { ...movie, comments: updatedComments };
        }
        return movie;
      })
    );
    localStorage.setItem(
      selectedMovie.id.toString(),
      JSON.stringify(updatedComments)
    );
    onClose();
  };
  return (
    <>
      <Table variant="simple">
        {isGreaterThan920 && (
          <Thead>
            <Tr>
              <Th minWidth="16rem">Poster</Th>
              <Th minWidth="10rem">Title</Th>
              <Th>Genres</Th>
              <Th minWidth="13rem">Synopsis</Th>
              <Th>Comments</Th>
            </Tr>
          </Thead>
        )}
        <Tbody>
          {movies.map((movie, index) => {
            return (
              <Tr
                key={movie.id}
                borderTop={index !== 0 ? "1px solid #7b7b7b" : "none"}
              >
                <Td
                  maxHeight="19rem"
                  d={!isGreaterThan920 ? "flex" : "table-cell"}
                  justifyContent="space-between"
                >
                  {!isGreaterThan920 && <Text fontWeight={600}>Poster</Text>}
                  <Image
                    src={movie.medium_cover_image}
                    alt={movie.title}
                    width="11rem"
                  />
                </Td>
                <Td
                  d={!isGreaterThan920 ? "flex" : "table-cell"}
                  justifyContent="space-between"
                >
                  {!isGreaterThan920 && <Text fontWeight={600}>Title</Text>}
                  <Text>{movie.title}</Text>
                </Td>
                <Td
                  d={!isGreaterThan920 ? "flex" : "table-cell"}
                  justifyContent="space-between"
                >
                  {!isGreaterThan920 && <Text fontWeight={600}>Genres</Text>}
                  <Text maxWidth={isGreaterThan920 ? "100%" : "70%"}>
                    {movie.genres.join(", ")}
                  </Text>
                </Td>
                <Td
                  d={!isGreaterThan920 ? "flex" : "table-cell"}
                  justifyContent="space-between"
                >
                  {!isGreaterThan920 && <Text fontWeight={600}>Synopsis</Text>}
                  <Text
                    maxWidth={isGreaterThan920 ? "90%" : "70%"}
                    textAlign="justify"
                  >
                    {movie.synopsis}
                  </Text>
                </Td>
                <Td
                  d={!isGreaterThan920 ? "flex" : "table-cell"}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {!isGreaterThan920 && <Text fontWeight={600}>Comments</Text>}
                  <Button onClick={() => handleCommentsShow(movie)}>
                    Show
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              {selectedMovie?.comments.map((comment) => {
                return (
                  <Flex
                    key={comment.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    padding="1rem"
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>{comment.content}</Text>
                    <DeleteIcon
                      cursor="pointer"
                      onClick={() => handleCommentDelete(comment.id)}
                    />
                  </Flex>
                );
              })}
            </VStack>
            {selectedMovie?.comments.length === 0 && (
              <Text textAlign="center">Comment first!</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Textarea
              placeholder="Type your comment here..."
              marginRight="1rem"
              value={commentInputText}
              onChange={(event) => setCommentInputText(event.target.value)}
            />
            <Button colorScheme="teal" mr={3} onClick={handleCommentAdd}>
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MoviesTable;
