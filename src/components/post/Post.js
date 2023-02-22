import { Box } from "@chakra-ui/layout";

import {
  PostReplies,
  withPostReplies,
} from "../../containers/post/PostRepliesWithContext";

import { PostContent } from "./PostContent";
import { ParentPost } from "./ParentPost";

const PostWithReplies = withPostReplies(PostReplies);

export const Post = ({ post, showReplies = false, index = 0 }) => {
  return (
    <Box border="1px solid" padding={[2, null, null, 4]}>
      {index === 0 ? (
        <>
          <ParentPost post={post} />
        </>
      ) : (
        <>
          <PostContent content={post?.richContent?.content} />
          {/* upvote elem */}
          {/* <PostFooter
            index={index}
            commentCount={post?.commentCount}
            size="xs"
          /> */}
        </>
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
