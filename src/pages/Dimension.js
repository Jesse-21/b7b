import React from "react";
import { useParams } from "react-router-dom";

import { PostFeedWithContext } from "../containers/post/PostFeedWithContext";
import { CreatePostOrReply } from "../containers/post/CreatePostOrReply";
import { SetupCommunityWithContext } from "../containers/community/SetupCommunityWithContext";

import {
  CommunityContextProvider,
  useCommunityContext,
} from "../context/CommunityContext";

export const withDimensionContext = (Component) => {
  const Memo = React.memo(Component);
  const CommunityContextProviderMemo = React.memo(CommunityContextProvider);

  // eslint-disable-next-line react/display-name
  return () => {
    const { dimension } = useParams();
    console.log("dimension", dimension);
    const domain = React.useMemo(() => {
      return dimension?.split(".")?.[0];
    }, [dimension]);
    const tld = React.useMemo(() => {
      return dimension?.split(".")?.[1];
    }, [dimension]);
    return (
      <CommunityContextProviderMemo domain={domain} tld={tld}>
        <Memo />
      </CommunityContextProviderMemo>
    );
  };
};

const withCommunityContext = (Component) => {
  const Memo = React.memo(Component, (prev, next) => {
    return prev.communityId === next.communityId;
  });
  const SetupCommunityWithContextMemo = React.memo(SetupCommunityWithContext);

  // eslint-disable-next-line react/display-name
  return () => {
    console.log("withCommunityContext");
    const { community, loading } = useCommunityContext();
    if (loading) return <>Loading...</>;
    if (!community?._id) {
      return <SetupCommunityWithContextMemo />;
    }
    if (!community.currentAccountPermissions.canRead) return <>No access</>;

    return <Memo communityId={community?._id} />;
  };
};

export const DimensionContent = ({ communityId }) => {
  return (
    <>
      <CreatePostOrReply
        placeholder={"Publish a public message!"}
        colorScheme="pink"
        size="lg"
        communityId={communityId}
      ></CreatePostOrReply>
      <PostFeedWithContext
        filters={{
          community: communityId,
          excludeChannels: true,
          excludeComments: true,
        }}
      ></PostFeedWithContext>
    </>
  );
};

export const Dimension = React.memo(withCommunityContext(DimensionContent));
