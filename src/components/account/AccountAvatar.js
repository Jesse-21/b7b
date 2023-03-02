import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";

export const AccountAvatar = ({ account, size = 100, ...props }) => {
  return (
    <Image
      src={account?.profileImage?.src}
      alt={account?.username}
      width={size}
      height={size}
      borderRadius="full"
      objectFit="cover"
      {...props}
      fallback={
        <Box
          display={"flex"}
          justifyContent="center"
          alignContent={"center"}
          background="blackAlpha.200"
          fontWeight={"semibold"}
        >
          {account?.username?.charAt(0)?.toUpperCase()}
        </Box>
      }
    />
  );
};
