import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useParams } from "react-router-dom";

import { makeApolloClient } from "../../helpers/make-apollo-client";

export const HostApolloProvider = ({ children, dimension }) => {
  const [client, setClient] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    if (dimension) {
      makeApolloClient(dimension).then((hostClient) => {
        if (isMounted) setClient(hostClient);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [dimension]);
  if (!client) return <>Resolving host for {dimension}...</>;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

const withParams = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ children }) => {
    const { dimension } = useParams();
    return <Memo dimension={dimension}>{children}</Memo>;
  };
};

export const HostApolloProviderWithParams = withParams(HostApolloProvider);
