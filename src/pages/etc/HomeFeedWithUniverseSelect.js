import React from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";

import {
  withPostFeedContext,
  PostFeedWrapper,
} from "../../containers/post/PostFeedWithContext";
import {
  PostFeedContextProvider,
  usePostFeedContext,
} from "../../context/PostFeedContext";
import { config } from "../../config";

const PostFeed = withPostFeedContext(PostFeedWrapper);

const ResetOnUniverseChange = (universe) => {
  const { resetPostFeed } = usePostFeedContext();
  React.useEffect(() => {
    resetPostFeed();
  }, [universe]);
  return <></>;
};

const HomeFeed = () => {
  return (
    <PostFeedContextProvider
      filters={{
        excludeChannels: true,
        excludeComments: true,
        explore: false,
      }}
      limit={10}
      sort="lastActivity"
    >
      <PostFeed />
      <ResetOnUniverseChange />
    </PostFeedContextProvider>
  );
};

export const HomeFeedWithUniverse = ({ uri }) => {
  const navigate = useNavigate();
  const onClick = React.useCallback(
    (e) => {
      e.preventDefault();
      window.localStorage.setItem("uri", e.target.value);
      navigate(`?uri=${e.target.value}`, {
        relative: "path",
      });
    },
    [navigate]
  );

  return (
    <>
      <Text fontSize="sm" color="text.secondary">
        {" "}
        Select a Universe:
      </Text>
      <Select
        maxW={["100%", null, null, "xs"]}
        mb={2}
        defaultValue={uri}
        onChange={onClick}
      >
        <option value={config.DEFAULT_URI}>
          BEBverse - {config.DEFAULT_URI}
        </option>
        <option value="https://universe.b5b.xyz/graphql">
          B5B (Railway.app) - https://universe.b5b.xyz/graphql
        </option>
      </Select>
      <HomeFeed />
    </>
  );
};

export const HomeFeedWithUniverseSelect = HomeFeedWithUniverse;
