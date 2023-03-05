import React from "react";
import { Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";

import {
  withPostFeedContext,
  PostFeedWrapper,
} from "../../containers/post/PostFeedWithContext";
import { PostFeedContextProvider } from "../../context/PostFeedContext";
import { config } from "../../config";

const PostFeed = withPostFeedContext(PostFeedWrapper);

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
        <option value="https://universe.up.railway.app/graphql">
          NSFW - https://universe.up.railway.app/graphql
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
      </PostFeedContextProvider>
    </>
  );
};
