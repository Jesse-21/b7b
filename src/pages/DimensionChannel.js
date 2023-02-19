import React from "react";
import { useParams } from "react-router-dom";

import { PostFeedWithContext } from "../containers/post/PostFeedWithContext";
import { CommunityContextProvider } from "../context/CommunityContext";
import { ChannelContextProvider } from "../context/ChannelContext";

const withDimensionChannelContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { dimension, channelId } = useParams();
    const domain = React.useMemo(() => {
      return dimension?.split(".")?.[0];
    }, [dimension]);
    const tld = React.useMemo(() => {
      return dimension?.split(".")?.[1];
    }, [dimension]);
    return (
      <CommunityContextProvider domain={domain} tld={tld}>
        <ChannelContextProvider channelId={channelId}>
          <Memo />
        </ChannelContextProvider>
      </CommunityContextProvider>
    );
  };
};
const DimensionChannelContent = () => {
  return <PostFeedWithContext></PostFeedWithContext>;
};

export const DimensionChannel = withDimensionChannelContext(
  DimensionChannelContent
);
