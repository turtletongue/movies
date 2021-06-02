import { Box } from "@chakra-ui/layout";
import { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode[] | ReactNode;
}

const PageContent = ({ children }: PageContentProps) => {
  return <Box width="100%">{children}</Box>;
};

export default PageContent;
