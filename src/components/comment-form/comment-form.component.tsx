import { Button } from "@chakra-ui/button";
import { Textarea } from "@chakra-ui/textarea";
import { useMoviesTable } from "../../redux/hooks";

interface CommentFormProps {
  onCommentAdd: () => void;
}

const CommentForm = ({ onCommentAdd }: CommentFormProps) => {
  const { commentInputText, setCommentInputText } = useMoviesTable();
  return (
    <>
      <Textarea
        placeholder="Type your comment here..."
        marginRight="1rem"
        value={commentInputText}
        onChange={(event) => setCommentInputText(event.target.value)}
      />
      <Button colorScheme="teal" mr={3} onClick={onCommentAdd}>
        Send
      </Button>
    </>
  );
};

export default CommentForm;
