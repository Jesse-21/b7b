import React from "react";
import { Text } from "@chakra-ui/layout";

import { shortenAddress } from "../../helpers/shorten-address";

/** @TODO while the post don't have title, use the sliced content as title */
export const PostTitle = ({
  contentRaw,
  username,
  address,
  parentUsername,
  ...props
}) => {
  const title = React.useMemo(() => {
    if (contentRaw) {
      let sliced = contentRaw.slice(0, 128);
      if (sliced.length < contentRaw.length) {
        sliced += "...";
      }
      return sliced;
    } else if (parentUsername) {
      return `Reply to ${parentUsername}'s post`;
    } else if (username) {
      return `${username}'s post`;
    } else if (address) {
      return `${shortenAddress(address)}'s post`;
    } else {
      return "Untitled post";
    }
  }, [contentRaw, username, address, parentUsername]);
  return <Text {...props}>{`${title}`}</Text>;
};
