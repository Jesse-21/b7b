import React from "react";
import { Box } from "@chakra-ui/layout";

import {
  PostReplies,
  withPostReplies,
} from "../../containers/post/PostRepliesWithContext";

import { PostContent } from "./PostContent";
import { PostTitle } from "./PostTitle";
import { PostFooter } from "./PostFooter";

import { makePostLink } from "../../helpers/make-post-link";

const PostWithReplies = withPostReplies(PostReplies);

const ParentPost = ({ post }) => {
  const postLink = React.useMemo(() => {
    return makePostLink(post, true);
  }, [post?._id]);

  return (
    <Box>
      <PostTitle
        contentRaw={post?.richContent?.content?.raw}
        username={post?.account?.username}
        address={post?.account?.address?.address}
      />
      {/* expand elem */}
      <PostFooter
        index={0}
        commentCount={post?.commentCount}
        size="xs"
        postLink={postLink}
      />
    </Box>
  );
};
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
