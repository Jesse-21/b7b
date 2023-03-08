export const getInitialDomain = (uri) => {
  if (!uri) {
    return "playground";
  }
  if (uri === "https://protocol.beb.xyz/graphql") {
    return "playground";
  } else if (
    uri === "https://universe.up.railway.app/graphql" ||
    uri === "https://universe.b5b.xyz/graphql"
  ) {
    return "realcrypto";
  } else {
    return "playground";
  }
};
