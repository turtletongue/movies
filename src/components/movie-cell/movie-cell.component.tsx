import { useMediaQuery } from "@chakra-ui/media-query";
import { Td } from "@chakra-ui/table";
import { ReactNode } from "react";

interface MovieCellProps {
  children: ReactNode | ReactNode[];
  [stylePropName: string]: any;
}

const MovieCell = ({ children, ...styleProps }: MovieCellProps) => {
  const [isGreaterThan920] = useMediaQuery("(min-width: 920px)");
  return (
    <Td
      d={!isGreaterThan920 ? "flex" : "table-cell"}
      justifyContent="space-between"
      {...styleProps}
    >
      {children}
    </Td>
  );
};

export default MovieCell;
