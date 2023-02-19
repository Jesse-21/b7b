import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import { ethers } from "ethers";

import { abi } from "./abis/DimensionResolver";
import { getTokenIdFromLabel } from "./get-token-id-from-label";

const retryLink = new RetryLink();

const createDimensionAuthKey = (dimension) => {
  if (!dimension) return "default-auth-token";
  const split = dimension.split(".");
  const locale = split[0];
  const tld = split[1] || "beb";

  const cleanLocale = locale.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return `auth-token-${cleanLocale}-${tld}`;
};
const createDimensionAuthLink = (dimension) => {
  const authKey = createDimensionAuthKey(dimension);
  return setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = Cookies.get(authKey);

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
};
const createDimensionHttpLink = (dimension) => {
  const myContract = new ethers.Contract(
    "0x2167A15c97fE3A28c0eebfA23a3368974A2b64E5",
    abi,
    new ethers.InfuraProvider("goerli")
  );
  const tokenId = getTokenIdFromLabel(dimension);
  console.log(tokenId, "tokenId");
  myContract.get(tokenId).then((res) => console.log(res));

  return createHttpLink({
    // uri: "https://protocol.beb.xyz/graphql",
    uri: "http://localhost:8080/graphql",
  });
};

export const makeApolloClient = (dimension) => {
  const httpLink = createDimensionHttpLink(dimension);
  const authLink = createDimensionAuthLink(dimension);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: retryLink.concat(authLink.concat(httpLink)),
  });
  return client;
};
