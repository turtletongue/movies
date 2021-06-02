import { Image } from "@chakra-ui/image";
import { Box, Center, Text } from "@chakra-ui/layout";
import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center bgColor="#EFEDFA" height="100vh">
          <Box>
            <Image src="/error.png" alt="Ice Cream" maxWidth="25rem" />
            <Text
              textAlign="center"
              color="#9b8875"
              fontWeight={600}
              fontSize="1.5rem"
            >
              An unexpected error occurred. We'll fix it soon.
            </Text>
          </Box>
        </Center>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
