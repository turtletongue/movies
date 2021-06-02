import { Center } from "@chakra-ui/layout";
import { ReactNode } from "react";

interface PageProps {
  children: ReactNode[] | ReactNode;
}

const PageContainer = ({ children }: PageProps) => {
  return (
    <Center width="100%" minHeight="100vh" className="page-container">
      {children}
    </Center>
  );
};

export default PageContainer;
