import { Box } from "@chakra-ui/layout";

import {
  PostReplies,
  withPostReplies,
} from "../../containers/post/PostRepliesWithContext";

import { PostContent } from "./PostContent";
import { PostTitle } from "./PostTitle";

const PostWithReplies = withPostReplies(PostReplies);

const ParentPost = ({ post }) => {
  return (
    <Box>
      <PostTitle
        contentRaw={post?.richContent?.content?.raw}
        username={post?.account?.username}
        address={post?.account?.address?.address}
      />
    </Box>
  );
};
export const Post = ({ post, showReplies = false, index = 0 }) => {
  console.log("Post", post?._id, showReplies, index);
  return (
    <Box border="1px solid" padding={[2, null, null, 4]}>
      {index === 0 ? (
        <ParentPost post={post} />
      ) : (
        <PostContent content={post?.richContent?.content} />
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
