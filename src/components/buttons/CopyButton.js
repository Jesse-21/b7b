import React from "react";
import { IconButton, Button } from "@chakra-ui/button";
import { useClipboard } from "@chakra-ui/hooks";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";

/**
 * Simple Button to copy value.
 */
export const CopyButton = ({ value, icon, children, ...buttonProps }) => {
  const { hasCopied, onCopy } = useClipboard(value);
  const _onCopy = React.useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onCopy();
    },
    [onCopy]
  );

  return children ? (
    <Button
      onClick={_onCopy}
      leftIcon={
        hasCopied ? (
          <CheckIcon color="teal.500" />
        ) : (
          icon || <CopyIcon color="var(--chakra-colors-hover-background)" />
        )
      }
      variant="ghost"
      {...buttonProps}
    >
      {hasCopied ? "Copied!" : children}
    </Button>
  ) : (
    <IconButton
      onClick={onCopy}
      icon={
        hasCopied ? (
          <CheckIcon color="teal.500" />
        ) : (
          icon || <CopyIcon color="var(--chakra-colors-hover-background)" />
        )
      }
      variant="ghost"
      {...buttonProps}
    ></IconButton>
  );
};
