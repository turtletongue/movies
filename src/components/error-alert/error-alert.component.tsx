import { Alert, AlertIcon } from "@chakra-ui/alert";
import { ReactNode } from "react";

interface ErrorAlertProps {
  children: ReactNode[] | ReactNode | string;
}

const ErrorAlert = ({ children }: ErrorAlertProps) => {
  return (
    <Alert status="error">
      <AlertIcon />
      {children}
    </Alert>
  );
};

export default ErrorAlert;
