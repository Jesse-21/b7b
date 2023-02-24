export const config = {
  DEFAULT_URI: "http://localhost:8080/graphql",
  USE_GITHUB_HOST: true,
  // get the current window cookie domain
  RESOLVER_ADDRESS: "0x2167A15c97fE3A28c0eebfA23a3368974A2b64E5",
  COOKIE_DOMAIN:
    window.location.hostname === "localhost"
      ? "localhost"
      : window.location.hostname?.split?.(".")?.slice?.(-2)?.join?.("."),
};
