import React from "react";
import { Flex, Text, Box } from "@chakra-ui/layout";

import { useCommunityContext } from "../../context/CommunityContext";

import { ImageWithUpload } from "../../components/image/ImageWithUpload";

import { useUploadImage } from "../../helpers/hooks/useUploadImage";
import { useEditCommunity } from "../../helpers/hooks/useEditCommunity";
import { useErrorToast } from "../../helpers/hooks/useErrorToast";

const withCommunityContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { community } = useCommunityContext();
    const { onEditCommunity } = useEditCommunity();
    const onEdit = React.useCallback(
      (values = {}) => {
        if (!community?._id) return;
        const variables = {
          communityId: community._id,
          bannerImageId: values.bannerImageId,
          imageId: values.imageId,
        };
        onEditCommunity(variables);
      },
      [community?._id, onEditCommunity]
    );

    return (
      <Memo
        bannerImageSrc={community?.bannerImage?.src}
        imageSrc={community?.image?.src}
        onEdit={onEdit}
      />
    );
  };
};

const AdminCommunityImages = ({ bannerImageSrc, imageSrc, onEdit }) => {
  const { onImageUpload, loading, error, image } = useUploadImage();
  const {
    onImageUpload: onBannerImageUpload,
    loading: bannerLoading,
    error: bannerError,
    image: bannerImage,
  } = useUploadImage();

  useErrorToast(error || bannerError);

  React.useEffect(() => {
    console.log("image", image?._id);
    if (image?._id) {
      onEdit({ imageId: image?._id });
    }
    if (bannerImage?._id) {
      onEdit({ bannerImageId: bannerImage?._id });
    }
  }, [image?._id, bannerImage?._id]);
  return (
    <Box>
      <Box w="100%" h={48} display="flex">
        <ImageWithUpload
          onImageUpload={onBannerImageUpload}
          w="100%"
          h="auto"
          objectFit={"cover"}
          src={bannerImage?.src || bannerImageSrc}
          backgroundColor="gray.400"
          borderColor="gray.400"
          rounded="md"
          loading={bannerLoading}
        ></ImageWithUpload>
      </Box>
      <Box px={[2, null, null, 4]}>
        <ImageWithUpload
          src={image?.src || imageSrc}
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
