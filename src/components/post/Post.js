import { Box } from "@chakra-ui/layout";

import {
  PostReplies,
  withPostReplies,
} from "../../containers/post/PostRepliesWithContext";

import { PostRichContent } from "./PostContent";
import { ParentPost } from "./ParentPost";
import { ReplyPost } from "./ReplyPost";

const PostWithReplies = withPostReplies(PostReplies);

export const Post = ({
  post,
  showReplies = false,
  isStandalone = false,
  index = 0,
}) => {
  return (
    <Box
      border="1px solid var(--chakra-colors-border)"
      borderBottom={
        index === 0 ? "none" : "1px solid var(--chakra-colors-border)"
      }
      padding={[2, null, null, 4]}
    >
      {index === 0 ? (
        <ParentPost post={post} isStandalone={isStandalone} />
      ) : (
        <ReplyPost index={index} post={post} />
      )}
      {showReplies && (
        <PostWithReplies
          post={post}
          // @TODO maybe stop looping at certain index?
          showReplies={true}
          index={index + 1}
        />
      )}
    </Box>
  );
};
