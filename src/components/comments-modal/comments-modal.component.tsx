import { Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import Comments from "../../containers/comments/comments.container";
import Movie from "../../interfaces/Movie";
import CommentCard from "../comment-card/comment-card.component";
import CommentForm from "../comment-form/comment-form.component";

interface CommentsModalProps {
  selectedMovie?: Movie;
  isOpen: boolean;
  onClose: () => void;
  onCommentAdd: () => void;
  onCommentRemove: (commentId: number) => void;
}

const CommentsModal = ({
  selectedMovie,
  isOpen,
  onClose,
  onCommentAdd,
  onCommentRemove,
}: CommentsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Comments>
            {selectedMovie?.comments.map((comment) => {
              return (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onCommentRemove={onCommentRemove}
                />
              );
            })}
          </Comments>
          {selectedMovie?.comments.length === 0 && (
            <Text textAlign="center">Comment first!</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <CommentForm onCommentAdd={onCommentAdd} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;
