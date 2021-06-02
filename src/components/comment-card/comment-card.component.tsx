import { DeleteIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/layout";
import Comment from "../../interfaces/Comment";

interface CommentCardProps {
  comment: Comment;
  onCommentRemove: (commentId: number) => void;
}

const CommentCard = ({ comment, onCommentRemove }: CommentCardProps) => {
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding="1rem"
      width="95%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text>{comment.content}</Text>
      <DeleteIcon
        cursor="pointer"
        onClick={() => onCommentRemove(comment.id)}
        focusable
      />
    </Flex>
  );
};

export default CommentCard;
