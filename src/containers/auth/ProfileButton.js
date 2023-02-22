import React from "react";

import { Flex } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { MenuButton, MenuList, MenuItem, Menu } from "@chakra-ui/menu";

import { useAuthModalContext, AuthModalSteps } from "../../context/AuthModal";

import { MetamaskIcon } from "../../components/icons/Metamask";

import { useAuthContext } from "../../context/AuthContext";

import { shortenAddress } from "../../helpers/shorten-address";

export const ProfileButton = ({ size = "large" }) => {
  const { loading, currentAccount, onSignOut, activeAddress } =
    useAuthContext();

  const { onOpen: onAuthModalOpen, step } = useAuthModalContext();

  const shortAddress = React.useMemo(() => {
    return shortenAddress(activeAddress);
  }, [activeAddress]);

  const showMenu = React.useMemo(() => {
    return step === AuthModalSteps.DONE;
  }, [step]);

  const onBebdomainClick = () => {
    window.open("https://beb.domains", "_blank");
  };

  const onDeveloperClick = () => {
    window.open("https://docs.beb.xyz", "_blank");
  };

  const connectButtonPtops = {
    onClick: onAuthModalOpen,
    isLoading: loading,
    size: "md",
    rounded: "3xl",
    colorScheme: null,
  };

  const profileButtonText = useBreakpointValue({
    base: null,
    xs: null,
    sm: null,
    md: currentAccount?.username || shortAddress,
  });

  return (
    <>
      {showMenu ? (
        <Menu>
          <MenuButton
            as={Button}
            {...connectButtonPtops}
            onClick={null}
            isLoading={false}
            variant={size === "large" ? null : "ghost"}
            size={size === "large" ? "lg" : "md"}
            px={size === "large" ? "4" : "0"}
          >
            <Flex alignItems={"center"}>
              {size === "large" && profileButtonText}
              {currentAccount && (
                <Avatar
                  src={currentAccount?.profileImage?.src}
                  name={currentAccount?.name}
                  size={size === "large" ? "sm" : "md"}
                  ml={["0", null, size === "large" ? "2" : "0"]}
                />
              )}
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onBebdomainClick}>
              Create your Community
            </MenuItem>

            <MenuItem onClick={onDeveloperClick}>Developers</MenuItem>
            <MenuItem onClick={onSignOut}>Log out</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button {...connectButtonPtops}>
          {size === "large" ? <>Enter BEB</> : <MetamaskIcon />}
        </Button>
      )}
    </>
  );
};
