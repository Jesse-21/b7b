import React from "react";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { ModalFooter } from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { ethers } from "ethers";

import { AddressWithCopy } from "../../components/address/AddressWithCopy";

import { useAuthContext } from "../../context/AuthContext";

/**
 * Signin using magic link
 */
export const GuestLogin = () => {
  const [wallet, setWallet] = React.useState(null);
  const [view, setView] = React.useState("mnemonic");

  const { onGuestSignin, error, loading } = useAuthContext();

  React.useEffect(() => {
    const generatedWallet = ethers.Wallet.createRandom();
    setWallet(generatedWallet);
  }, []);

  const onClick = React.useCallback(() => {
    if (wallet) {
      onGuestSignin(wallet);
    }
  }, [wallet, onGuestSignin]);

  const onViewChange = React.useCallback(() => {
    if (view === "mnemonic") {
      setWallet(null);
      setView("import");
    } else if (view === "import") {
      setView("mnemonic");
      // have to reset the wallet
      const generatedWallet = ethers.Wallet.createRandom();
      setWallet(generatedWallet);
    }
  }, [setView, setWallet, view]);

  const onMnemonicChange = React.useCallback((e) => {
    const value = e.target.value;
    if (!value) return;
    try {
      const newWallet = ethers.Wallet.fromMnemonic(value);
      setWallet(newWallet);
    } catch (_e) {
      // invalid mnemonic
    }
  }, []);

  return (
    <>
      <Flex flexDir="column" w="100%">
        <Text>
          {view === "mnemonic" ? (
            <>
              A temporary account has been generated for you. Store your
              mnemonic phrase in a safe place.
            </>
          ) : (
            <>Recover an existing account by entering your mnemonic phrase.</>
          )}
        </Text>
        {view === "mnemonic" && (
          <>
            <Box mt={4}>
              <Text size="xs" color="text.secondary">
                Your public address
              </Text>
              <AddressWithCopy
                address={wallet?.address}
                shortAddress={wallet?.address}
              />
            </Box>
            <Box mt={4} w="100%">
              <Text size="xs" color="text.secondary">
                Your mnemonic phrase
              </Text>
              <AddressWithCopy
                address={wallet?.mnemonic?.phrase}
                shortAddress={wallet?.mnemonic?.phrase}
                type="button"
                size="lg"
                minW={"100%"}
                textAlign="left"
                whiteSpace="break-spaces"
                height="128px"
              />
            </Box>
          </>
        )}
        {view === "import" && (
          <>
            <Box mt={4} w="100%">
              <Text size="xs" color="text.secondary">
                Enter your mnemonic phrase
              </Text>
              <Textarea onChange={onMnemonicChange}></Textarea>
            </Box>
          </>
        )}
        <Box>
          <Button
            mt={4}
            rounded="3xl"
            size="lg"
            w="100%"
            onClick={onClick}
            colorScheme="pink"
            isDisabled={loading || !wallet}
          >
            Sign in
          </Button>
          <Button variant={"unstyled"} mt={2} w="100%" onClick={onViewChange}>
            {view === "mnemonic"
              ? "Import an existing account"
              : "Generate a new account"}
          </Button>
        </Box>
      </Flex>
      <ModalFooter mt={4}>
        <Box>
          <Text color="text.secondary">
            Warning: a guest account is meant to be a temporary account. There
            is no way to recover your account if you lose your mnemonic phrase.
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
