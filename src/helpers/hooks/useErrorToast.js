import { useToast } from "@chakra-ui/toast";
import React from "react";

export const useErrorToast = (error) => {
  const toast = useToast();

  React.useEffect(() => {
    if (error) {
      toast({
        title: "An error has occured",
        description: error,
        status: "error",
      });
    }
  }, [error]);
};
