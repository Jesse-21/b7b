import React from "react";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import { PostTitle } from "./PostTitle";
import { PostFooter } from "./PostFooter";

import {
  makePostLink,
  makePostChannelLink,
} from "../../helpers/make-post-link";
import { getDateFromNow } from "../../helpers/get-date-from-now";

export const ParentPost = ({ post }) => {
  const postLink = React.useMemo(() => {
    return makePostLink(post, true);
  }, [post?._id]);
  const postChannelLink = React.useMemo(() => {
    return makePostChannelLink(post, false);
  }, [post?._id]);

  return (
    <Box>
      <PostTitle
        contentRaw={post?.richContent?.content?.raw}
        username={post?.account?.username}
        address={post?.account?.address?.address}
      />
      <HStack>
        <Button
          // ml={1}
          color="text.secondary"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          size="xs"
          as="a"
          variant="link"
          href={postChannelLink}
        >
          to: {post?.channel?.slug || "all"}@{post?.community?.bebdomain}.
          {post?.community?.tld || "beb"}
        </Button>
        <Text color="text.secondary" fontSize="xs">
          &bull; posted by {post?.account?.username},{" "}
          {getDateFromNow(post?.createdAt)}
        </Text>
      </HStack>
      {/* expand elem */}
      <PostFooter
        index={0}
        commentCount={post?.rootCommentCount}
        size="xs"
        postLink={postLink}
      />
    </Box>
  );
};
