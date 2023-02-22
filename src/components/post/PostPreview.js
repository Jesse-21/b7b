import React from "react";
import { Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

import { Text as TextIcon } from "../icons/Text";

export const PostPreview = ({ block, ...props }) => {
  const image = React.useMemo(() => {
    if (block?.type === "IMAGE") {
      return block?.image?.src;
    } else if (block?.type === "LINK") {
      return block?.link?.image;
    } else {
      return null;
    }
  }, [block?._id]);
  return (
    <Box pos={"relative"} {...props}>
      {image ? (
        <>
          <Image src={image} />
        </>
      ) : (
        <Box>
          <TextIcon />
        </Box>
      )}
    </Box>
  );
};
