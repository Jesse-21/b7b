import React from "react";
import { useParams } from "react-router-dom";

import { PostFeedWithChannelContext } from "../containers/post/PostFeedWithContext";
import { ChannelContextProvider } from "../context/ChannelContext";

export const withDimensionChannelContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { channelId } = useParams();

    return (
      <ChannelContextProvider channelId={channelId}>
        <Memo />
      </ChannelContextProvider>
    );
  };
};
export const DimensionChannelContent = () => {
  return <PostFeedWithChannelContext></PostFeedWithChannelContext>;
};

export const DimensionChannel = withDimensionChannelContext(
  DimensionChannelContent
);
