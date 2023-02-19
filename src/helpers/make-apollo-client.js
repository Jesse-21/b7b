import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import { ethers } from "ethers";

import { abi } from "./abis/DimensionResolver";
import { getTokenIdFromLabel } from "./get-token-id-from-label";

const retryLink = new RetryLink();

const createDimensionAuthKey = (dimension, tld) => {
  if (!dimension) return "default-auth-token";

  return `auth-token-${dimension}-${tld}`;
};
const createDimensionAuthLink = (dimension) => {
  const authKey = createDimensionAuthKey(dimension);
  return setContext((_, { headers }) => {
    const token = Cookies.get(authKey);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
};
const createDimensionHttpLink = (dimension) => {
  if (!dimension) {
    // @TODO - make this configurable default dimension
    return createHttpLink({
      // uri: "https://protocol.beb.xyz/graphql",
      uri: "http://localhost:8080/graphql",
    });
  }
  const myContract = new ethers.Contract(
    "0x2167A15c97fE3A28c0eebfA23a3368974A2b64E5",
    abi,
    // @TODO - make this configurable with API key
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
  const split = dimension?.split(".");
  const locale = split?.[0];
  const cleanLocale = locale?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const tld = split?.[1] || "beb";

  const httpLink = createDimensionHttpLink(cleanLocale, tld);
  const authLink = createDimensionAuthLink(cleanLocale, tld);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: retryLink.concat(authLink.concat(httpLink)),
  });
  return client;
};
