import React from "react";
import { Box, HStack, Text } from "@chakra-ui/layout";

import { PostUpvoteWithActions } from "../../containers/post/PostUpvoteWithContext";
import { PostFooterWithAction } from "../../containers/post/PostFooterWithContext";

import { PostRichContent } from "./PostContent";

import { makePostLink } from "../../helpers/make-post-link";
import { getDateFromNow } from "../../helpers/get-date-from-now";
import { shortenAddress } from "../../helpers/shorten-address";

const ReplyPostFooter = ({ postLink, postId, index }) => {
  return (
    <>
      <HStack spacing={1}>
        <PostUpvoteWithActions postId={postId} size="xs" flexDir="row" />
        <PostFooterWithAction
          index={index}
          size="xs"
          postLink={postLink}
          clickShowReplyEditor={true}
          postId={postId}
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
      prev.postId === next.postId &&
      prev.index === next.index
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
            shortenAddress(post?.account?.address?.address)}{" "}
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
        index={index}
        postId={post?._id}
        postLink={postLink}
      />
    </Box>
  );
};
