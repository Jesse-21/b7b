import { Box } from "@chakra-ui/layout";

import { ProfileButton } from "../auth/ProfileButton";
import { AuthModal } from "../auth/AuthModal";
import { AuthModalContextProvider } from "../../context/AuthModal";

export const DimensionHeader = () => {
  return (
    <AuthModalContextProvider>
      <Box display="flex" justifyContent={"space-between"}>
        B7B
        <ProfileButton />
      </Box>
      <AuthModal />
    </AuthModalContextProvider>
  );
};
