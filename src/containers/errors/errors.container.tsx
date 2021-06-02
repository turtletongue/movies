import { VStack } from "@chakra-ui/layout";
import { ReactNode } from "react";

interface ErrorsProps {
  children: ReactNode[] | ReactNode;
}

const Errors = ({ children }: ErrorsProps) => {
  return (
    <VStack spacing={2} padding="1rem">
      {children}
    </VStack>
  );
};

export default Errors;
