import { Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";

interface MovieCellTextProps {
  children: string;
  [stylePropName: string]: any;
}

const MovieCellText = ({ children, ...styleProps }: MovieCellTextProps) => {
  const [isGreaterThan920] = useMediaQuery("(min-width: 920px)");
  return (
    <Text maxWidth={isGreaterThan920 ? "100%" : "70%"} {...styleProps}>
      {children}
    </Text>
  );
};

export default MovieCellText;
