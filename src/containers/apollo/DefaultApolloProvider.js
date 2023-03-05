import { ApolloProvider } from "@apollo/client";

import { makeDefaultApolloClient } from "../../helpers/make-apollo-client";

export const DefaultApolloProvider = ({ children }) => {
  const client = makeDefaultApolloClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
