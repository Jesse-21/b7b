import React from "react";
import { useParams } from "react-router-dom";

import { PostFeedWithContext } from "../containers/post/PostFeedWithContext";
import { CreatePostOrReply } from "../containers/post/CreatePostOrReply";

import {
  CommunityContextProvider,
  useCommunityContext,
} from "../context/CommunityContext";

const withDimensionContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { dimension } = useParams();
    const domain = React.useMemo(() => {
      return dimension?.split(".")?.[0];
    }, [dimension]);
    const tld = React.useMemo(() => {
      return dimension?.split(".")?.[1];
    }, [dimension]);
    return (
      <CommunityContextProvider domain={domain} tld={tld}>
        <Memo />
      </CommunityContextProvider>
    );
  };
};

const withCommunityContext = (Component) => {
  const Memo = React.memo(Component, (prev, next) => {
    return prev.communityId === next.communityId;
  });

  // eslint-disable-next-line react/display-name
  return () => {
    const { community } = useCommunityContext();
    return <Memo communityId={community?._id} />;
  };
};

const DimensionContent = ({ communityId }) => {
  return (
    <>
      <CreatePostOrReply
        placeholder={"Publish a public message!"}
        colorScheme="pink"
        communityId={communityId}
      ></CreatePostOrReply>
      <PostFeedWithContext></PostFeedWithContext>
    </>
  );
};

export const Dimension = withDimensionContext(
  withCommunityContext(DimensionContent)
);
