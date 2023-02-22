import React from "react";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";

import { PostTitle } from "./PostTitle";
import { PostContent } from "./PostContent";
import { PostFooter } from "./PostFooter";
import { Expand } from "../icons/Expand";

import {
  makePostLink,
  makePostChannelLink,
} from "../../helpers/make-post-link";
import { getDateFromNow } from "../../helpers/get-date-from-now";

export const ParentPost = ({ post, isStandalone = false }) => {
  const postLink = React.useMemo(() => {
    return makePostLink(post, true);
  }, [post?._id]);
  const postChannelLink = React.useMemo(() => {
    return makePostChannelLink(post, false);
  }, [post?._id]);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <PostTitle
        contentRaw={post?.richContent?.content?.raw}
        username={post?.account?.username}
        address={post?.account?.address?.address}
        _hover={{ textDecoration: "underline", cursor: "pointer" }}
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
          &bull; posted by {post?.account?.username},{" "}
          {getDateFromNow(post?.createdAt)}
        </Text>
      </HStack>
      <HStack mt={[2, null, null, 4]}>
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
          commentCount={post?.rootCommentCount}
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
      {isOpen && (
        <PostContent
          content={post?.richContent?.content}
          blocks={post?.richContent?.blocks}
        />
      )}
    </Box>
  );
};
