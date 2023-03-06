import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { ApolloProvider } from "@apollo/client";

import {
  withPostFeedContext,
  PostFeedWrapper,
} from "../../containers/post/PostFeedWithContext";
import {
  PostFeedContextProvider,
  usePostFeedContext,
} from "../../context/PostFeedContext";
import { config } from "../../config";
import { makeDefaultApolloClient } from "../../helpers/make-apollo-client";

const PostFeed = withPostFeedContext(PostFeedWrapper);

const ResetOnUniverseChange = (universe) => {
  const { resetPostFeed } = usePostFeedContext();
  React.useEffect(() => {
    resetPostFeed();
  }, [universe]);
  return <></>;
};

const withApolloProvider = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ uri = config.DEFAULT_URI }) => {
    const [client, setClient] = React.useState(null);

    React.useEffect(() => {
      let isMounted = true;
      if (uri) {
        const _client = makeDefaultApolloClient(uri);
        if (isMounted) {
          setClient(_client);
        }
      }
      return () => {
        isMounted = false;
      };
    }, [uri]);

    if (!client) return <>Resolving host for {uri}...</>;

    return (
      <ApolloProvider client={client}>
        <Memo />
      </ApolloProvider>
    );
  };
};

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const withQueryParams = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ children }) => {
    const query = useQuery();
    const uri =
      query.get("uri") ||
      window.localStorage.getItem("uri") ||
      config.DEFAULT_URI;

    return <Memo uri={uri}>{children}</Memo>;
  };
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

const HomeFeedWithApolloProvider = withApolloProvider(HomeFeed);

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
      <HomeFeedWithApolloProvider uri={uri} />
    </>
  );
};

export const HomeFeedWithUniverseSelect = withQueryParams(HomeFeedWithUniverse);
