import React from "react";
import { Text, Box } from "@chakra-ui/layout";
import { useParams, Link } from "react-router-dom";

import { PostFeedWithContext } from "../containers/post/PostFeedWithContext";
import { CreatePostOrReply } from "../containers/post/CreatePostOrReply";
import { BannerAndProfileImage } from "../components/community/BannerAndProfileImage";
import {
  CommunityContextProvider,
  useCommunityContext,
} from "../context/CommunityContext";

import { DimensionHead } from "../pages/head/Dimension";

export const withDimensionContext = (Component) => {
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

    return (
      <>
        <DimensionHead community={community} />
        <Memo
          communityId={community?._id}
          imageSrc={community?.image?.src}
          bannerImageSrc={community?.bannerImageSrc?.src}
          communityName={community?.name}
          communityDescription={community?.bio?.raw}
        />
      </>
    );
  };
};

export const DimensionContent = ({
  communityId,
  bannerImageSrc,
  imageSrc,
  communityName,
  communityDescription,
}) => {
  return (
    <>
      <BannerAndProfileImage
        bannerImageSrc={bannerImageSrc}
        imageSrc={imageSrc}
      >
        <Box display="flex" justifyContent={"space-between"} w="100%">
          <Box ml={2}>
            <Text fontSize="xl" fontWeight={"bold"}>
              {communityName}
            </Text>
            <Text color="text.secondary">{communityDescription}</Text>
          </Box>
          <Link
            to="admin"
            relative="path"
            style={{
              color: "var(--chakra-colors-gray-500)",
            }}
          >
            Admin
          </Link>
        </Box>
      </BannerAndProfileImage>
      <Box my={4}>
        <CreatePostOrReply
          placeholder={"Publish a public message!"}
          colorScheme="pink"
          size="lg"
          communityId={communityId}
        ></CreatePostOrReply>
      </Box>
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
