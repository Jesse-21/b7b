import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import { Contract, providers } from "ethers";

import { abi } from "./abis/DimensionResolver";
import { getTokenIdFromLabel } from "./get-token-id-from-label";
import { createCookiesAuthKey } from "./create-cookies-auth-key";
import { config } from "../config";

const retryLink = new RetryLink();

export const typePolicies = {
  Community: {
    keyFields: ["tokenId"],
  },
};

const createDimensionAuthLink = (hostUri) => {
  const authKey = createCookiesAuthKey(hostUri);
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
const getDimensionHostUri = async (dimension) => {
  if (!dimension) {
    return config.DEFAULT_URI;
  }
  const myContract = new Contract(
    config.RESOLVER_ADDRESS,
    abi,
    // @TODO - make this configurable with API key
    new providers.InfuraProvider(config.NODE_NETWORK)
  );
  const tokenId = getTokenIdFromLabel(dimension);
  let hostUri = await myContract.get(tokenId);
  let uri;
  if (!hostUri) {
    uri = new URL(config.DEFAULT_URI);
  } else {
    if (hostUri.slice(0, 4) !== "http") {
      hostUri = "http://" + hostUri;
    }
    try {
      uri = new URL(hostUri);
    } catch (e) {
      // invalid uri
      uri = new URL(config.DEFAULT_URI);
    }
  }

  return uri;
};

export const makeApolloClient = async (dimension) => {
  const split = dimension?.split(".");
  const locale = split?.[0];
  const cleanLocale = locale?.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
  const tld = split?.[1] || "beb";

  const hostUri = await getDimensionHostUri(cleanLocale, tld);

  window.hostUri = hostUri;
  const authLink = createDimensionAuthLink(hostUri.toString());

  const httpLink = createHttpLink({
    // uri: "https://protocol.beb.xyz/graphql",
    uri: hostUri.toString(),
  });

  const client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies,
    }),
    link: retryLink.concat(authLink.concat(httpLink)),
  });

  return client;
};
