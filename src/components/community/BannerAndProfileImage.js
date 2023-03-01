import { Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

export const BannerAndProfileImage = ({
  bannerImageSrc,
  imageSrc,
  children,
  ...props
}) => {
  return (
    <Box {...props}>
      <Box w="100%" h={[24, null, null, 48]} display="flex">
        <Image
          w="100%"
          h="auto"
          objectFit={"cover"}
          src={bannerImageSrc}
          backgroundColor="pink.400"
          borderColor="pink.400"
        ></Image>
      </Box>
      <Box px={[2, null, null, 4]} display="flex">
        <Image
          src={imageSrc}
          objectFit={"contain"}
          mt={-16}
          h={32}
          w={32}
          rounded="md"
        ></Image>
        {children}
      </Box>
    </Box>
  );
};
