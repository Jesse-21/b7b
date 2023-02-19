import { ethers } from "ethers";

export const getTokenIdFromLabel = (label) => {
  if (!label) return null;
  const labelHash = ethers.keccak256(ethers.toUtf8Bytes(label));
  const tokenId = ethers.toBigInt(labelHash).toString();
  return tokenId;
};
