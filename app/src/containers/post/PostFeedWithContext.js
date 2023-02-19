import React from "react";

import { Text, Box } from "@chakra-ui/react";

import {
  PostFeedContextProvider,
  usePostFeedContext,
} from "../../context/PostFeedContext";
import { useCommunityContext } from "../../context/CommunityContext";

const PostFeedWrapper = ({ postFeed }) => {
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
    const { postFeed, loading, error } = usePostFeedContext();
    return <Memo postFeed={postFeed} />;
  };
};
export const withCommunityContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { community } = useCommunityContext();
    if (!community) return <>No community</>;

    return (
      <PostFeedContextProvider
        limit={10}
        sort="lastActivity"
        filters={{
          community: community?._id,
          excludeChannels: true,
          excludeComments: true,
        }}
      >
        <Memo communityId={community?._id} />
      </PostFeedContextProvider>
    );
  };
};
export const PostFeedWithContext = withCommunityContext(
  withPostFeedContext(PostFeedWrapper)
);
