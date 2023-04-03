import React from "react";
import { Box, HStack, Text } from "@chakra-ui/layout";

import { PostFooterWithAction } from "../../containers/post/PostFooterWithContext";

import { AccountAvatar } from "../account/AccountAvatar";

import { PostRichContent } from "./PostContent";

import { makePostLink } from "../../helpers/make-post-link";
import { getDateFromNow } from "../../helpers/get-date-from-now";
import { shortenAddress } from "../../helpers/shorten-address";

const ReplyPostFooter = ({ postLink, postId, index }) => {
  return (
    <>
      <HStack spacing={1}>
        <PostFooterWithAction
          index={index}
          size="xs"
          postLink={postLink}
          postId={postId}
          replyEditorStyle={"inline"}
          showUpvote={true}
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
      <Box display={"flex"} mb={2}>
        <AccountAvatar account={post?.account} size={8} mr={2} />
        <Text color="text.secondary" fontSize="xs" lineHeight={1.15}>
          {post?.account?.username ||
            shortenAddress(post?.account?.address?.address)}{" "}
          &bull; {getDateFromNow(post?.createdAt)}
          <br />
          {post?.account?.bio?.raw}
        </Text>
      </Box>
      <Box mb={2}>
        <PostRichContent
          content={post?.richContent?.content}
          blocks={post?.richContent?.blocks}
          isHidden={post?.isHidden}
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
