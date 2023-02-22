import React from "react";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

const GuestIcon = () => {
  return (
    <Box display={"flex"}>
      <Box rounded="full" background="background.overlay" p={2} mr={1}>
        <Box h={"24px"} w={"24px"}>
          👤
        </Box>
      </Box>
    </Box>
  );
};

/**
 * The 'connect guest button
 */
export const ConnectGuestButton = ({ loading, onClick, ...props }) => {
  return (
    <Button
      onClick={onClick}
      isLoading={loading}
      variant="solid"
      leftIcon={<GuestIcon />}
      {...props}
    >
      {"Guest Login"}
    </Button>
  );
};
