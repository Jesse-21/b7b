import React from "react";
import { Box } from "@chakra-ui/layout";

import {
  PostFeedContextProvider,
  usePostFeedContext,
} from "../../context/PostFeedContext";
import { useCommunityContext } from "../../context/CommunityContext";
import { useChannelContext } from "../../context/ChannelContext";

import { PostWithContext } from "./PostWithContext";

const PostFeedWrapper = ({ postFeed }) => {
  return (
    <Box>
      {postFeed?.map((post) => (
        <PostWithContext key={post?._id} post={post} />
      ))}
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
    const { community, loading } = useCommunityContext();
    if (loading) return <>Loading...</>;
    if (!community?._id) return <>No community</>;
    if (!community.currentAccountPermissions.canRead) return <>No access</>;

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

export const withChannelContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { channel, loading } = useChannelContext();
    if (loading) return <>Loading...</>;
    if (!channel?._id) return <>No channel</>;
    if (!channel.currentAccountPermissions.canRead) return <>No access</>;

    return (
      <PostFeedContextProvider
        limit={10}
        sort="lastActivity"
        filters={{
          channel: channel?._id,
          excludeChannels: false,
          excludeComments: true,
        }}
      >
        <Memo channelId={channel?._id} />
      </PostFeedContextProvider>
    );
  };
};
export const PostFeedWithContext = withCommunityContext(
  withPostFeedContext(PostFeedWrapper)
);

export const PostFeedWithChannelContext = withChannelContext(
  withPostFeedContext(PostFeedWrapper)
);
