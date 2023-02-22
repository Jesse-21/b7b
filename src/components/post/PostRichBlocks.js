import React from "react";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { Image } from "@chakra-ui/image";

export const PostOrReplyRichBlockImage = ({
  block: _block = {},
  size = "xs",
}) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const block = _block.image;
  return (
    <Flex
      width="100%"
      height={size}
      border="1px solid"
      borderRadius={"3xl"}
      borderColor="border"
      justifyContent={"center"}
    >
      <Image
        src={block?.src}
        height={["100%", null, null, size]}
        width="auto"
        maxWidth="100%"
        className="post-rich-block"
        backgroundColor="transparent"
        objectFit={"contain"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }}
        cursor={"pointer"}
      ></Image>
      {/* <FullScreenImageModal
        isOpen={isOpen}
        onClose={onClose}
        src={block?.src}
        name={block?.name}
      /> */}
    </Flex>
  );
};

export const PostOrReplyRichBlockRichEmbed = ({ block: _block = {} }) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const block = _block.richEmbed;
  return (
    <Flex
      width="100%"
      p={4}
      borderLeftColor={block?.color || "background"}
      borderLeftWidth={4}
      borderTopRightRadius={"4px"}
      borderBottomRightRadius={"4px"}
      backgroundColor="background.main.solid"
    >
      <Box flex="1">
        <Text fontSize="md" fontWeight="bold">
          {block?.title}
        </Text>
        <Box
          fontSize="sm"
          color="text.secondary"
          dangerouslySetInnerHTML={{
            __html: block?.description?.html,
          }}
        ></Box>
      </Box>
      <Image
        {...block?.thumbnail}
        size="lg"
        borderRadius="2xl"
        onClick={onToggle}
        cursor={"pointer"}
      ></Image>
      {/* <FullScreenImageModal
        isOpen={isOpen}
        onClose={onClose}
        src={block?.image?.src || block?.thumbnail?.src}
        name={block?.image?.name || block?.thumbnail?.name}
      /> */}
    </Flex>
  );
};

export const PostOrReplyRichBlockLink = ({
  block: _block = {},
  size = "xs",
}) => {
  const block = _block?.link;
  return (
    <Flex
      flexDir={"column"}
      border="1px solid"
      borderRadius={"3xl"}
      borderColor="border"
      rounded="3xl"
      zIndex={"2 !important"}
      _hover={{
        backgroundColor: "hover.background",
        cursor: "pointer",
      }}
      transitionProperty={"var(--chakra-transition-property-common)"}
      transitionDuration={"var(--chakra-transition-duration-normal)"}
      onClick={() => window.open(block?.url, "_blank")}
      backgroundColor="background.main.solid"
      width={"100%"}
      maxWidth={"md"}
    >
      <Box
        width="100%"
        overflowX="hidden"
        display={"flex"}
        justifyContent="center"
        borderTopLeftRadius="3xl"
        borderTopRightRadius="3xl"
      >
        <Image
          src={block?.image}
          m="auto"
          height={["3xs", null, null, size]}
          width="auto"
          maxW="unset"
          fallback={<Box m="auto"></Box>}
        />
      </Box>
      <Box p={[2, null, null, 4]}>
        <Text color="text.secondary">{block?.url}</Text>
        <Text fontWeight={"semibold"}>{block?.title}</Text>
        <Text
          color="text.secondary"
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
        >
          {block?.description}
        </Text>
      </Box>
    </Flex>
  );
};

export const PostOrReplyRichBlock = ({ blockType, block, size = "xs" }) => {
  return (
    <>
      {blockType === "IMAGE" && (
        <PostOrReplyRichBlockImage block={block} size={size} />
      )}
      {blockType === "LINK" && (
        <PostOrReplyRichBlockLink block={block} size={size} />
      )}
      {blockType === "RICH_EMBED" && (
        <PostOrReplyRichBlockRichEmbed block={block} size={size} />
      )}
    </>
  );
};
