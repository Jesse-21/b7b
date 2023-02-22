export const createCookiesAuthKey = (hostUri) => {
  if (!hostUri) return "default-auth-token";

  return `auth-token-${hostUri}`;
};
