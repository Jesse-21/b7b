import React from "react";

import { Box, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";

import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";

export const PostUpvote = ({
  currentLikes,
  onPostLike,
  reactionCount,
  size,
  ...props
}) => {
  const _onPostLike = React.useCallback(
    (e, value) => {
      e.preventDefault();
      e.stopPropagation();
      onPostLike(value);
    },
    [onPostLike]
  );

  return (
    <Box display={"flex"} {...props}>
      <IconButton
        aria-label="Upvote"
        icon={<TriangleUpIcon />}
        onClick={(e) => _onPostLike(e, 1)}
        colorScheme={currentLikes === 1 ? "green" : "gray"}
        isDisabled={currentLikes === 1}
        variant="ghost"
        size={size}
      />
      <Text fontSize={size} textAlign="center" fontWeight={"bold"}>
        {reactionCount}
      </Text>
      <IconButton
        aria-label="Downvote"
        icon={<TriangleDownIcon />}
        onClick={(e) => _onPostLike(e, -1)}
        isDisabled={currentLikes === -1}
        colorScheme={currentLikes === -1 ? "pink" : "gray"}
        variant="ghost"
        size={size}
      />
    </Box>
  );
};
