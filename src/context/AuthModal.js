/* eslint-disable no-empty-function */
// Metamask doc https://docs.metamask.io/guide/ethereum-provider.html

import React from "react";
import { useDisclosure } from "@chakra-ui/react";

import { useAuthContext } from "./AuthContext";

export const AuthModalSteps = {
  CONNECT: "connect",
  SIGN_IN: "sign_in",
  GUEST_SIGN_IN: "GUEST_SIGN_IN",
  DONE: "done",
};
export const AuthModalContext = React.createContext({
  // modal states
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  step: AuthModalSteps.CONNECT,
  setStep: () => {},
});

export const useAuthModalContext = () => React.useContext(AuthModalContext);

export const AuthModalContextProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentAccount } = useAuthContext();

  const [step, setStep] = React.useState(AuthModalSteps.CONNECT);

  React.useEffect(() => {
    let mounted = true;
    if (!mounted) return;

    if (currentAccount) {
      setStep(AuthModalSteps.DONE);
    } else {
      setStep(AuthModalSteps.CONNECT);
    }
    return () => {
      mounted = false;
    };
  }, [currentAccount?._id]);

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
        step,
        setStep,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};
