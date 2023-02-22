export const shortenAddress = (address) => {
  if (!address) return "";
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export const shortenAccountSlug = (slug) => {
  if (!slug) return "";
  const split = slug.split("@");
  if (split.length !== 2) return slug;
  const address = split[0];
  if (address?.[0] !== "0" || address?.[1] !== "x") return slug;
  return shortenAddress(address) + "@" + split[1];
};
