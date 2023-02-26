import React from "react";
import { useParams, Link } from "react-router-dom";

import { PostFeedWithContext } from "../containers/post/PostFeedWithContext";
import { CreatePostOrReply } from "../containers/post/CreatePostOrReply";

import {
  CommunityContextProvider,
  useCommunityContext,
} from "../context/CommunityContext";

export const withDimensionContext = (Component) => {
  const Memo = React.memo(Component);

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
    const { community, loading } = useCommunityContext();
    if (loading) return <>Loading...</>;
    if (!community?._id) {
      return (
        <>
          No community found. If you are the owner, go to{" "}
          <Link
            to="admin"
            relative="path"
            style={{ textDecoration: "underscore" }}
          >
            /admin to initiate your community
          </Link>
        </>
      );
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
