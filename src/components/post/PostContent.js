import { Text, Box } from "@chakra-ui/layout";
import { PostOrReplyRichBlock } from "./PostRichBlocks";

export const PostContent = ({ content, isHidden }) => {
  if (isHidden) {
    return (
      <Text whiteSpace={"pre-wrap"} lineHeight="1.15">
        <i>This comment was deleted</i>
      </Text>
    );
  }

  if (content?.raw?.length >= 0) {
    return (
      <Text whiteSpace={"pre-wrap"} lineHeight="1.15">{`${content?.raw}`}</Text>
    );
  }

  return (
    <Text whiteSpace={"pre-wrap"} lineHeight="1.15">
      <i>
        You do not have the permission to view this post. Make sure you are
        logged in, and contact the dimension owner if you think this is an
        error.
      </i>
    </Text>
  );
};

export const PostRichContent = ({ blocks, content, isHidden }) => {
  return (
    <>
      <Box mb={blocks?.length ? 2 : 0}>
        <PostContent content={content} isHidden={isHidden} />
      </Box>
      {!isHidden &&
        blocks?.map((block, index) => (
          <PostOrReplyRichBlock key={index} {...block} />
        ))}
    </>
  );
};
