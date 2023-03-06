import React from "react";
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
export const HomeFeedWithUniverseSelect = () => {
  const [uri, setUri] = React.useState(config.DEFAULT_URI);

  return (
    <>
      <Text fontSize="sm" color="text.secondary">
        {" "}
        Select a host Universe home feed:
      </Text>
      <Select
        maxW={["100%", null, null, "xs"]}
        mb={2}
        defaultValue={config.DEFAULT_URI}
        onChange={(e) => {
          setUri(e.target.value);
        }}
      >
        <option value={config.DEFAULT_URI}>
          Default - {config.DEFAULT_URI}
        </option>
        <option value="https://universe.b5b.xyz/graphql">
          Self-hosted - https://universe.b5b.xyz/graphql
        </option>
      </Select>
      <PostFeedContextProvider
        filters={{
          excludeChannels: true,
          excludeComments: true,
          explore: false,
        }}
        limit={10}
        sort="lastActivity"
        context={{
          uri: uri,
        }}
      >
        <PostFeed />
        <ResetOnUniverseChange />
      </PostFeedContextProvider>
    </>
  );
};
