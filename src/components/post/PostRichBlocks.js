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
        {...block}
        height={["100%", null, null, size]}
        width="auto"
        maxWidth="100%"
        className="post-rich-block"
        backgroundColor="transparent"
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
      <style jsx global>
        {`
          .post-rich-block > img {
            border-radius: 0;
            object-fit: contain !important;
          }
        `}
      </style>
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
  if (block?.iframe)
    return (
      <>
        {block?.image && (
          <Box
            width="100%"
            overflowX="hidden"
            display={"flex"}
            justifyContent="center"
            borderTopLeftRadius="3xl"
            borderTopRightRadius="3xl"
            background="gray.600"
            onClick={() => window.open(block.url, "_blank")}
            _hover={{
              backgroundColor: "hover.background",
              cursor: "pointer",
            }}
            transitionProperty={"var(--chakra-transition-property-common)"}
            transitionDuration={"var(--chakra-transition-duration-normal)"}
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
        )}
        <Box
          height={["100%", null, null, "auto"]}
          width={["auto", null, null, "100%"]}
          m="auto"
          justifyContent={"flex-start"}
          display={"flex"}
          maxH={["sm"]}
          overflowY="auto"
          dangerouslySetInnerHTML={{ __html: block.iframe }}
          transitionProperty={"var(--chakra-transition-property-common)"}
          transitionDuration={"var(--chakra-transition-duration-normal)"}
          onClick={() => window.open(block.url, "_blank")}
          _hover={{
            backgroundColor: "hover.background",
            cursor: "pointer",
          }}
          border="1px solid"
          borderRadius={"3xl"}
          borderColor="border"
          p={[2, null, null, 4]}
          borderTopLeftRadius={block?.image ? 0 : "3xl"}
          borderTopRightRadius={block?.image ? 0 : "3xl"}
        ></Box>
        <style jsx global>
          {`
            .twitter-tweet::before {
              // add a small image of twitter
              content: "";
              width: 24px;
              height: 24px;
              display: inline-block;
              background-image: url("https://abs.twimg.com/icons/apple-touch-icon-192x192.png");
              background-repeat: no-repeat;
              background-size: 24px;
            }
            .farcaster-embed::before {
              // add a small image of farcaster
              content: "";
              width: 24px;
              height: 24px;
              display: inline-block;
              background-image: url("/farcaster_logo_48.png");
              background-repeat: no-repeat;
              background-size: 24px;
            }
          `}
        </style>
      </>
    );
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
