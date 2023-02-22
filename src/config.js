export const config = {
  DEFAULT_URI: "http://localhost:8080/graphql",
  USE_GITHUB_HOST: true,
  // get the current window cookie domain
  COOKIE_DOMAIN:
    window.location.hostname === "localhost"
      ? "localhost"
      : window.location.hostname?.split?.(".")?.slice?.(-2)?.join?.("."),
};
