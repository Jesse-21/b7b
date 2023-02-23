import React from "react";
import { Box, HStack, Text } from "@chakra-ui/layout";

import { PostUpvoteWithActions } from "../../containers/post/PostUpvoteWithContext";

import { PostRichContent } from "./PostContent";
import { PostFooter } from "./PostFooter";

import { makePostLink } from "../../helpers/make-post-link";
import { getDateFromNow } from "../../helpers/get-date-from-now";
import { shortenAddress } from "../../helpers/shorten-address";

const ReplyPostFooter = ({ postLink, postId, commentCount }) => {
  return (
    <>
      <HStack spacing={1}>
        <PostUpvoteWithActions postId={postId} size="xs" flexDir="row" />
        <PostFooter
          index={0}
          commentCount={commentCount}
          size="xs"
          postLink={postLink}
          onPostCommentClick={(e) => {
            e.preventDefault();
            // @TODO scroll to comment
          }}
        />
      </HStack>
    </>
  );
};

const ReplyPostFooterMemo = React.memo(
  ReplyPostFooter,
  (prev = {}, next = {}) => {
    return (
      prev.postLink === next.postLink &&
      prev.commentCount === next.commentCount &&
      prev.postId === next.postId
    );
  }
);

export const ReplyPost = ({ post, index }) => {
  const postLink = React.useMemo(() => {
    return makePostLink(post, true);
  }, [post?._id]);

  return (
    <Box>
      <Box>
        <Text color="text.secondary" fontSize="xs">
          {post?.account?.username ||
            shortenAddress(post?.account?.address?.address)}
          &bull; {getDateFromNow(post?.createdAt)}
        </Text>
      </Box>
      <Box mb={2}>
        <PostRichContent
          content={post?.richContent?.content}
          blocks={post?.richContent?.blocks}
        />
      </Box>
      <ReplyPostFooterMemo
        postId={post?._id}
        commentCount={post?.commentCount}
        postLink={postLink}
      />
    </Box>
  );
};
