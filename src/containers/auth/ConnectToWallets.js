import React from "react";
import { Flex, Text, Box, VStack } from "@chakra-ui/layout";
import { ModalFooter } from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";

import { ConnectGuestButton } from "./GuestButton";
import { RainbowConnectButton } from "./RainbowConnectButton";
import { useAuthContext } from "../../context/AuthContext";

import { useAuthModalContext, AuthModalSteps } from "../../context/AuthModal";

/**
 * All the available wallets to connect
 */
export const ConnectToWallets = () => {
  const { loading, error, activeAddress, onDisconnectWallet } =
    useAuthContext();

  const { setStep } = useAuthModalContext();

  const connectButtonPtops = {
    size: "lg",
    rounded: "3xl",
    variant: null,
    colorScheme: null,
    width: "100%",
  };
  return (
    <>
      <Flex flexDir="column" alignItems="center">
        <RainbowConnectButton
          isDisabled={loading}
          mb={4}
          {...connectButtonPtops}
          onClick={() => setStep(AuthModalSteps.SIGN_IN)}
          variant="outline"
        />
        <Text fontSize="sm" color="text.secondary" mb={2}>
          Use guest login to generate or recover a temporary account.
        </Text>
        <ConnectGuestButton
          isDisabled={loading}
          {...connectButtonPtops}
          onClick={() => setStep(AuthModalSteps.GUEST_SIGN_IN)}
        ></ConnectGuestButton>
      </Flex>
      <ModalFooter mt={0}>
        <Box margin="auto" textAlign={"center"}>
          <VStack>
            {activeAddress && !loading && (
              <Button
                variant="link"
                size="sm"
                colorScheme="red"
                onClick={onDisconnectWallet}
              >
                Disconnect wallet
              </Button>
            )}
            <Text pt={2} fontSize="sm" color="text.secondary">
              <i>
                B7B is a browser to explore BEB dimensions, which are
                decentralized and self-hosted by third-parties. As a result, the
                developers and hosts of B7B do not moderate or control the
                content of dimensions, and does not assume responsibility.
                Contact the host of the appropriate dimension to report any
                concerns.
              </i>
            </Text>
          </VStack>
          {error && (
            <Text color="red" fontSize="md">
              {error}
            </Text>
          )}
        </Box>
      </ModalFooter>
    </>
  );
};
