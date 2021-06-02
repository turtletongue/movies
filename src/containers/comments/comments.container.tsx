import { VStack } from "@chakra-ui/layout";
import { ReactNode } from "react";

interface CommentsProps {
  children: ReactNode[] | ReactNode;
}

const Comments = ({ children }: CommentsProps) => {
  return (
    <VStack
      spacing={2}
      maxHeight="60vh"
      overflowY="scroll"
      className="scroll-stack"
    >
      {children}
    </VStack>
  );
};

export default Comments;
