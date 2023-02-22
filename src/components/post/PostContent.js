import { Text, Box } from "@chakra-ui/layout";
import { PostOrReplyRichBlock } from "./PostRichBlocks";

export const PostContent = ({ content }) => {
  return (
    <Text whiteSpace={"pre-wrap"} lineHeight="1.15">{`${
      content?.raw || ""
    }`}</Text>
  );
};

export const PostRichContent = ({ blocks, content }) => {
  return (
    <>
      <Box mb={blocks?.length ? 2 : 0}>
        <PostContent content={content} />
      </Box>
      {blocks?.map((block, index) => (
        <PostOrReplyRichBlock key={index} {...block} />
      ))}
    </>
  );
};
