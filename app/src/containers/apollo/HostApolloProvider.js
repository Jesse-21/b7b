import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useParams } from "react-router-dom";

import { makeApolloClient } from "../../helpers/make-apollo-client";

export const HostApolloProvider = ({ children, dimension }) => {
  const client = makeApolloClient(dimension);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export const HostApolloProviderWithParams = ({ children }) => {
  const { dimension } = useParams();

  return (
    <HostApolloProvider dimension={dimension}>{children}</HostApolloProvider>
  );
};
