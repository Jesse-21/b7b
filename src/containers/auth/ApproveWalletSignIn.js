import React from "react";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { ModalFooter } from "@chakra-ui/modal";

import { useAuthContext } from "../../context/AuthContext";

import { AddressWithCopy } from "../../components/address/AddressWithCopy";

import { shortenAddress } from "../../helpers/shorten-address";

/**
 * All the available wallets to connect
 */
export const ApproveWalletSignIn = () => {
  const { activeAddress, currentWallet, onSignIn, error, loading } =
    useAuthContext();

  const shortAddress = React.useMemo(() => {
    return shortenAddress(activeAddress);
  }, [activeAddress]);

  return (
    <>
      <Flex flexDir="column">
        <Text>
          {currentWallet ? (
            <>
              You are connected using <b>{currentWallet}</b>.
            </>
          ) : (
            <>You are not connected to any wallet provider.</>
          )}
        </Text>
        <Text mt={4} fontSize="md" color="text.secondary" mb={2}>
          active address
        </Text>
        <AddressWithCopy address={activeAddress} shortAddress={shortAddress} />
        <Button
          mt={4}
          rounded="3xl"
          size="lg"
          colorScheme={"purple"}
          onClick={onSignIn}
          isDisabled={loading || !activeAddress}
        >
          Login/Join
        </Button>
      </Flex>
      <ModalFooter mt={4}>
        <Box>
          <Text color="text.tertiary">
            By signing the transaction, you allow beb.xyz to store your session
            securely in your browser&apos;s local storage.
          </Text>
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
