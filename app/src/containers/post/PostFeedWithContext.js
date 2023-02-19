import React from "react";

import { Text, Box } from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import {
  PostFeedContextProvider,
  usePostFeedContext,
} from "../../context/PostFeedContext";

const PostFeed = () => {
  const { postFeed, loading, error } = usePostFeedContext();
  //   console.log("rendered", postFeed);
  return (
    <Box>
      <Text fontSize="3xl" fontWeight="bold">
        BEB dimension
      </Text>
    </Box>
  );
};

export const withPostFeedContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
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
        <Memo />
      </PostFeedContextProvider>
    );
  };
};
export const PostFeedWithContext = withPostFeedContext(PostFeed);
