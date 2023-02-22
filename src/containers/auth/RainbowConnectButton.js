import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import { MetamaskIcon } from "../../components/icons/Metamask";

const WalletIcon = () => {
  return (
    <Box display={"flex"}>
      <Box rounded="full" background="background.overlay" p={2} mr={1}>
        <Box h={"24px"} w={"24px"}>
          🌈
        </Box>
      </Box>
      <Box rounded="full" background="background.overlay" p={2}>
        <MetamaskIcon />
      </Box>
    </Box>
  );
};
export const RainbowConnectButton = ({
  titleWhenConnected,
  titleWhenDisconencted,
  ...props
}) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const onClick = () => {
          if (!mounted || !account || !chain) {
            openConnectModal();
          } else {
            props.onClick();
          }
        };
        return (
          <Box
            w="100%"
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button
                    leftIcon={<WalletIcon />}
                    {...props}
                    onClick={onClick}
                  >
                    {titleWhenDisconencted || "Wallets"}
                  </Button>
                );
              }
              return (
                <Button {...props} leftIcon={<WalletIcon />} onClick={onClick}>
                  {titleWhenConnected || account.displayName}
                </Button>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
