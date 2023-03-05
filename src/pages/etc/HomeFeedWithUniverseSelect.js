import React from "react";
import { Box } from "@chakra-ui/layout";

import {
  withPostFeedContext,
  PostFeedWrapper,
} from "../../containers/post/PostFeedWithContext";
import { PostFeedContextProvider } from "../../context/PostFeedContext";
import { config } from "../../config";

const PostFeed = withPostFeedContext(PostFeedWrapper);

export const HomeFeedWithUniverseSelect = () => {
  const [uri, setUri] = React.useState(config.DEFAULT_URI);

  return (
    <Box>
      <PostFeedContextProvider
        filters={{
          excludeChannels: true,
          excludeComments: true,
          explore: false,
        }}
        limit={10}
        sort="lastActivity"
        // context={{
        //   uri: uri,
        // }}
      >
        <PostFeed />
      </PostFeedContextProvider>
    </Box>
  );
};
