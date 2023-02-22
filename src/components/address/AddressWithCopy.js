import React from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useClipboard } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";

import { CopyButton } from "../buttons/CopyButton";

export const AddressWithCopy = ({
  shortAddress,
  address,
  width,
  type = "input",
  ...props
}) => {
  const { hasCopied, onCopy } = useClipboard(address);

  if (type === "input") {
    return (
      <InputGroup width={width || "100%"}>
        <InputRightElement height={"100%"}>
          <CopyButton value={address} />
        </InputRightElement>
        <Input
          isDisabled={true}
          variant="filled"
          type="text"
          placeholder="Address"
          value={shortAddress}
          size={"lg"}
          {...props}
        />
      </InputGroup>
    );
  }

  if (type === "button") {
    return (
      <Button
        onClick={onCopy}
        rightIcon={
          hasCopied ? (
            <CheckIcon color="teal.300" />
          ) : (
            <CopyIcon color="var(--chakra-colors-hover-background)" />
          )
        }
        {...props}
      >
        {shortAddress}
      </Button>
    );
  }
};
