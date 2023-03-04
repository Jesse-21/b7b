import React from "react";
import { Box } from "@chakra-ui/layout";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  PostFeedContextProvider,
  usePostFeedContext,
} from "../../context/PostFeedContext";
import { useCommunityContext } from "../../context/CommunityContext";
import { useChannelContext } from "../../context/ChannelContext";

import { PostWithActions } from "./PostWithContext";

const PostFeedWrapper = ({ postFeed, next, isEnd, loading, limit }) => {
  return (
    <InfiniteScroll
      dataLength={postFeed?.length || limit}
      next={next}
      hasMore={!isEnd || loading}
      loader={"Loading posts..."}
      endMessage={<Box mt={2}>No more posts to load</Box>}
    >
      {postFeed?.map((post) => (
        <PostWithActions key={post?._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export const withPostFeedContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { postFeed, loading, next, isEnd, limit } = usePostFeedContext();
    return (
      <Memo
        postFeed={postFeed}
        loading={loading}
        next={next}
        isEnd={isEnd}
        limit={limit}
      />
    );
  };
};

export const withPostFeedContextProvider = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ filters, sort = "lastActivity", limit = 10 }) => {
    console.log("withPostFeedContextProvider");
    return (
      <PostFeedContextProvider limit={limit} sort={sort} filters={filters}>
        <Memo />
      </PostFeedContextProvider>
    );
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
export const PostFeedWithCommunityContext = withCommunityContext(
  withPostFeedContext(PostFeedWrapper)
);

export const PostFeedWithChannelContext = withChannelContext(
  withPostFeedContext(PostFeedWrapper)
);

export const PostFeedWithContext = withPostFeedContextProvider(
  withPostFeedContext(PostFeedWrapper)
);
