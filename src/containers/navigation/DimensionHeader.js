import { Box, Text } from "@chakra-ui/layout";

import { ProfileButton } from "../auth/ProfileButton";
import { AuthModal } from "../auth/AuthModal";

import { AuthModalContextProvider } from "../../context/AuthModal";

import { SearchDimensionInput } from "../../components/input/SearchDimensionInput";
export const DimensionHeader = () => {
  return (
    <AuthModalContextProvider>
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
        py={2}
        px={[2, null, null, 4]}
      >
        <Text fontWeight={"bold"} fontSize="2xl">
          <a href="/">B7B</a>
        </Text>
        <Box display={"flex"}>
          <SearchDimensionInput size="lg" />
          <Box ml={2}>
            <ProfileButton />
          </Box>
        </Box>
      </Box>
      <AuthModal />
    </AuthModalContextProvider>
  );
};
