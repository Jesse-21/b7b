import React from "react";
import { Box, Flex, HStack, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

import { ImageWithUpload } from "../image/ImageWithUpload";
import { BasicEditor } from "./BasicEditor";
import { Image as ImageIcon } from "../icons/Image";

export const RichEditor = ({
  content = "",
  editor,
  setContent,
  loading,
  richBlocks = [],
  onImageUpload,
  onDeleteImageAttachment,
  size,
  limit,
  id,
  footer,
}) => {
  return (
    <>
      <Flex
        width={"100%"}
        flexDir={size === "lg" ? "column" : "row-reverse"}
        className={size === "lg" ? "rich-editor-lg" : "rich-editor"}
      >
        <Box flex="1">
          <BasicEditor
            id={id}
            content={content}
            editor={editor}
            setContent={setContent}
            limit={limit}
          />
        </Box>
        <Flex
          className="rich-editor-footer"
          backgroundColor={"background"}
          rounded="md"
          p={size === "lg" ? 2 : 1}
          {...{
            borderTopLeftRadius: size === "lg" ? 0 : "md",
            borderTopRightRadius: 0,
            borderBottomRightRadius: size === "lg" ? "md" : 0,
            borderTop: size === "lg" ? "1px solid" : 0,
            borderColor: "blackAlpha.300",
          }}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <HStack flex="1" display={"flex"}>
            <ImageWithUpload
              backgroundColor="background"
              h={size === "lg" ? "48px" : "36px"}
              w={size === "lg" ? "48px" : "36px"}
              defaultSrc={"https://via.placeholder.com/36"}
              onImageUpload={onImageUpload}
              loading={loading}
              allowMultiple={true}
            ></ImageWithUpload>
            {richBlocks?.map((block, i) => {
              return (
                <Image
                  key={i}
                  src={block?.src}
                  h={size === "lg" ? "48px" : "36px"}
                  w={size === "lg" ? "48px" : "36px"}
                ></Image>
              );
            })}
          </HStack>
          {footer}
        </Flex>
      </Flex>

      <Box mr="auto">
        {editor?.storage?.characterCount?.characters() > limit - 50 && (
          <Text color="text.secondary">{`${editor?.storage?.characterCount?.characters()}/${limit} characters`}</Text>
        )}
      </Box>
    </>
  );
};
