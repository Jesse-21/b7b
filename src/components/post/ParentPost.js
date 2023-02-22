import React from "react";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import isEqual from "lodash/isEqual";

import { PostTitle } from "./PostTitle";
import { PostContent } from "./PostContent";
import { PostFooter } from "./PostFooter";
import { PostUpvote } from "./PostUpvote";
import { PostPreview } from "./PostPreview";
import { Expand } from "../icons/Expand";

import {
  makePostLink,
  makePostChannelLink,
} from "../../helpers/make-post-link";
import { getDateFromNow } from "../../helpers/get-date-from-now";
import { shortenAddress } from "../../helpers/shorten-address";

const PostParentInner = ({
  isStandalone = false,
  postLink,
  rootCommentCount,
  content,
  blocks,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <HStack mt={[2, null, null, 4]} spacing={1}>
        {!isStandalone && (
          <IconButton
            icon={<Expand />}
            size="sm"
            variant={"ghost"}
            onClick={(e) => {
              e.preventDefault();
              onToggle();
            }}
          />
        )}
        <PostFooter
          index={0}
          commentCount={rootCommentCount}
          size="sm"
          postLink={postLink}
          onPostCommentClick={(e) => {
            e.preventDefault();
            if (isStandalone) {
              // @TODO scroll to comment
            } else {
              window.location.href = postLink;
            }
          }}
        />
      </HStack>
      {isOpen && <PostContent content={content} blocks={blocks} />}
    </>
  );
};

const PostParentInnerMemo = React.memo(
  PostParentInner,
  (prev = {}, next = {}) => {
    return (
      prev.isStandalone === next.isStandalone &&
      prev.postLink === next.postLink &&
      prev.rootCommentCount === next.rootCommentCount &&
      isEqual(prev.content, next.content) &&
      isEqual(prev.blocks, next.blocks)
    );
  }
);

export const ParentPost = ({ post, isStandalone = false }) => {
  const postLink = React.useMemo(() => {
    return makePostLink(post, true);
  }, [post?._id]);
  const postChannelLink = React.useMemo(() => {
    return makePostChannelLink(post, false);
  }, [post?._id]);

  return (
    <Box display="flex">
      <PostUpvote
        reactionCount={post?.reactionCount}
        size="sm"
        flexDir="column"
        mr={2}
      />
      <PostPreview
        mr={2}
        w={32}
        h={24}
        block={post?.richContent?.blocks?.[0]?.block}
        overflow="hidden"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="blackAlpha.100"
        rounded="sm"
      />
      <Box>
        <PostTitle
          contentRaw={post?.richContent?.content?.raw}
          username={post?.account?.username}
          address={post?.account?.address?.address}
          _hover={{ textDecoration: "underline", cursor: "pointer" }}
          fontWeight="semibold"
          as="a"
          href={postLink}
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
            &bull; posted by{" "}
            {post?.account?.username ||
              shortenAddress(post?.account?.address?.address)}
            , {getDateFromNow(post?.createdAt)}
          </Text>
        </HStack>
        <PostParentInnerMemo
          rootCommentCount={post?.rootCommentCount}
          content={post?.richContent?.content}
          blocks={post?.richContent?.blocks}
          isStandalone={isStandalone}
          postLink={postLink}
        />
      </Box>
    </Box>
  );
};
