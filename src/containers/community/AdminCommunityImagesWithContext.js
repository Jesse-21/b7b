import React from "react";
import { Flex, Text, Box } from "@chakra-ui/layout";

import { useCommunityContext } from "../../context/CommunityContext";

import { ImageWithUpload } from "../../components/image/ImageWithUpload";

import { useUploadImage } from "../../helpers/hooks/useUploadImage";
import { useErrorToast } from "../../helpers/hooks/useErrorToast";

const withCommunityContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { community } = useCommunityContext();

    return (
      <Memo
        bannerImageSrc={community?.bannerImage?.src}
        imageSrc={community?.image?.src}
      />
    );
  };
};

const AdminCommunityImages = ({ bannerImageSrc, imageSrc }) => {
  const { onImageUpload, loading, error } = useUploadImage();
  useErrorToast(error);
  return (
    <Box>
      <Box
        w="100%"
        h={48}
        display="flex"
        borderBottomLeftRadius={"2xl"}
        borderBottomRightRadius={"2xl"}
      >
        <ImageWithUpload
          onImageUpload={onImageUpload}
          w="100%"
          h="auto"
          objectFit={"cover"}
          src={bannerImageSrc}
          defaultSrc="/cover.jpg"
          rounded="md"
        ></ImageWithUpload>
      </Box>
      <Box px={[2, null, null, 4]}>
        <ImageWithUpload
          src={imageSrc}
          objectFit={"contain"}
          defaultSrc="/cover.jpg"
          mt={-16}
          h={32}
          w={32}
          onImageUpload={onImageUpload}
          loading={loading}
          rounded="md"
        ></ImageWithUpload>
      </Box>
    </Box>
  );
};

export const AdminCommunityImagesWithContext =
  withCommunityContext(AdminCommunityImages);
