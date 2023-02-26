import BigInt from "big-integer";

export const isFlagSetForPermissionString = (permissionString, flag) => {
  if (!flag || !permissionString) return false;
  return (
    (BigInt(permissionString) & BigInt(flag)).toString() ===
    BigInt(flag).toString()
  );
};
