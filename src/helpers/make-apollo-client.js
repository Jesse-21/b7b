import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import { ethers } from "ethers";

import { abi } from "./abis/DimensionResolver";
import { getTokenIdFromLabel } from "./get-token-id-from-label";
import { config } from "../config";

const retryLink = new RetryLink();

const createDimensionAuthKey = (hostUri) => {
  if (!hostUri) return "default-auth-token";

  return `auth-token-${hostUri}`;
};
const createDimensionAuthLink = (hostUri) => {
  const authKey = createDimensionAuthKey(hostUri);
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
  const myContract = new ethers.Contract(
    "0x2167A15c97fE3A28c0eebfA23a3368974A2b64E5",
    abi,
    // @TODO - make this configurable with API key
    new ethers.InfuraProvider("goerli")
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
  const cleanLocale = locale?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const tld = split?.[1] || "beb";

  const hostUri = await getDimensionHostUri(cleanLocale, tld);
  const authLink = createDimensionAuthLink(hostUri.toString());

  const httpLink = createHttpLink({
    // uri: "https://protocol.beb.xyz/graphql",
    uri: hostUri.toString(),
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: retryLink.concat(authLink.concat(httpLink)),
  });
  return client;
};
