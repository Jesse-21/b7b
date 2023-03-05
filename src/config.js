const isProd = window.location.hostname !== "localhost";

export const dev = {
  DEFAULT_URI: "http://localhost:8080/graphql",
  USE_GITHUB_HOST: true,
  ENV: "DEV",
  NODE_NETWORK: "goerli",
  // get the current window cookie domain
  RESOLVER_ADDRESS: "0x2167A15c97fE3A28c0eebfA23a3368974A2b64E5",
  COOKIE_DOMAIN: "localhost",
};

export const prod = {
  DEFAULT_URI: "https://protocol.beb.xyz/graphql",
  USE_GITHUB_HOST: true,
  ENV: "PROD",
  NODE_NETWORK: "mainnet",
  // get the current window cookie domain
  RESOLVER_ADDRESS: "0xf71a58ddc57214e431168c4a3f2ff62a069ab8a6",
  COOKIE_DOMAIN: window.location.hostname
    ?.split?.(".")
    ?.slice?.(-2)
    ?.join?.("."),
};

export const config = prod;
