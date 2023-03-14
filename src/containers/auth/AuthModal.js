import React from "react";
import { Flex } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { ModalBody } from "@chakra-ui/modal";
import { ChevronLeftIcon } from "@chakra-ui/icons";

import { ConnectToWallets } from "./ConnectToWallets";
import { ApproveWalletSignIn } from "./ApproveWalletSignIn";
import { GuestLogin } from "./GuestLogin";

import { ModalPrimary } from "../../components/modal/ModalPrimary";

import { useAuthModalContext, AuthModalSteps } from "../../context/AuthModal";
import { useAuthContext } from "../../context/AuthContext";

/**
 * The modal displaying all available wallets to connect
 */
export const AuthModal = () => {
  const { isOpen, onClose, step, setStep } = useAuthModalContext();
  const { loading } = useAuthContext();

  React.useEffect(() => {
    if (step === AuthModalSteps.DONE) {
      onClose();
    }
  }, [step]);

  if (!isOpen) return <div />;

  return (
    <ModalPrimary
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      header={
        <>
          {step === AuthModalSteps.CONNECT && "Join or Login"}
          {(step === AuthModalSteps.SIGN_IN ||
            step === AuthModalSteps.EMAIL_SIGN_IN) && (
            <Flex>
              <IconButton
                isDisabled={loading}
                size="sm"
                icon={<ChevronLeftIcon />}
                mr={2}
                onClick={() => setStep(AuthModalSteps.CONNECT)}
              />
              Login
            </Flex>
          )}
          {step === AuthModalSteps.NOT_INSTALLED && "Install Wallets"}
          {step === AuthModalSteps.GUEST_SIGN_IN && (
            <Flex>
              <IconButton
                isDisabled={loading}
                size="sm"
                icon={<ChevronLeftIcon />}
                mr={2}
                onClick={() => setStep(AuthModalSteps.CONNECT)}
              />
              Guest Login
            </Flex>
          )}
        </>
      }
    >
      <ModalBody>
        {step === AuthModalSteps.CONNECT && <ConnectToWallets />}
        {step === AuthModalSteps.SIGN_IN && <ApproveWalletSignIn />}
        {step === AuthModalSteps.GUEST_SIGN_IN && <GuestLogin />}
      </ModalBody>
    </ModalPrimary>
  );
};
