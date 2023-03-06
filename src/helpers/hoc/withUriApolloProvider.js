import React from "react";
import { ApolloProvider } from "@apollo/client";

import { makeDefaultApolloClient } from "../../helpers/make-apollo-client";

export const withUriApolloProvider = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ uri }) => {
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
