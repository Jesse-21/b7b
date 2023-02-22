import { utils, BigNumber } from "ethers";

export const getTokenIdFromLabel = (label) => {
  if (!label) return null;
  const labelHash = utils.keccak256(utils.toUtf8Bytes(label));
  const tokenId = BigNumber.from(labelHash).toString();
  return tokenId;
};
