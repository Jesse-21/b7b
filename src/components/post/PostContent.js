import { Text, Box } from "@chakra-ui/layout";
import { PostOrReplyRichBlock } from "./PostRichBlocks";

export const PostContent = ({ content }) => {
  return (
    <Text whiteSpace={"pre-wrap"} lineHeight="1">{`${
      content?.raw || ""
    }`}</Text>
  );
};

export const PostRichContent = ({ blocks, content }) => {
  return (
    <Box>
      <PostContent content={content} />
      {blocks?.map((block, index) => (
        <PostOrReplyRichBlock key={index} {...block} />
      ))}
    </Box>
  );
};
