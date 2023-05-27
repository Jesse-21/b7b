import { promiseWithTimeout } from "./promise-with-timeout";

/**
 * A wrapper for GraphQL Lazy Query with Timeout
 * @param {function} query function
 * @returns {Promise<any>}
 */
export const lazyQueryWithTimeout = (query, { timeout = 10000 } = {}) => {
  return promiseWithTimeout(
    query,
    timeout,
    "Request timed out. Please try again later. If this issue persists, please open an issue at https://github.com/bebdomains/b7b"
  );
};
