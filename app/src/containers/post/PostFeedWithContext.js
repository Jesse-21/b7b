import React from "react";

import { Text, Box } from "@chakra-ui/react";

import { PostFeedContextProvider } from "../../context/PostFeedContext";

const PostFeed = () => {
  return (
    <Box>
      <Text fontSize="3xl" fontWeight="bold">
        BEB dimension
      </Text>
    </Box>
  );
};
export const PostFeedWithContext = () => {
  return (
    <PostFeedContextProvider
      limit={10}
      sort="lastActivity"
      filters={{
        explore: true,
        excludeChannels: true,
        excludeComments: true,
      }}
    >
      <PostFeed />
    </PostFeedContextProvider>
  );
};
