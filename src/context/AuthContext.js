/* eslint-disable no-inline-comments */
/* eslint-disable no-empty-function */
import React from "react";
import Cookies from "js-cookie";
import { useApolloClient } from "@apollo/client";

import { useCurrentAccount } from "../helpers/hooks/useCurrentAccountSimple";
import { useAccountSigninMessage } from "../helpers/hooks/useAccountSigninMessage";
import { useSignin } from "../helpers/hooks/useSignin";
import { createCookiesAuthKey } from "../helpers/create-cookies-auth-key";

import { useWalletContext } from "./WalletContext";

import { config } from "../config";

export const AuthContext = React.createContext({
  loading: false,
  error: null,
  currentAccount: null,
  activeAddress: null, // the address that is currently active, can be wallet address or account address
  onSignIn: () => {},
  onSignOut: () => {},
  onEmailSignIn: () => {},
  onDisconnectWallet: () => {},
  currentWallet: null,
  setCurrentWallet: () => {},
  onGuestSignin: async () => {},
});
AuthContext.displayName = "AuthContext";

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [_loading, toggleLoading] = React.useState(false);
  const [_error, setError] = React.useState(null);
  const { onSignin: _onSignIn, error: signinError } = useSignin();
  const client = useApolloClient();
  const {
    currentAddress,
    onSignMessage,
    setCurrentWallet,
    currentWallet,
    onDisconnect,
  } = useWalletContext();

  const { getAccountSigninMessage } = useAccountSigninMessage();
  const {
    getCurrentAccount,
    account: currentAccount,
    loading: currentAccountLoading,
    refetchCurrentAccount,
  } = useCurrentAccount();

  const error = React.useMemo(() => {
    return signinError || _error;
  }, [signinError, _error]);
  const loading = React.useMemo(() => {
    return currentAccountLoading || _loading;
  }, [currentAccountLoading, _loading]);
  const activeAddress = React.useMemo(() => {
    return currentAccount?.address?.address || currentAddress;
  }, [currentAddress, currentAccount?.address?.address]);
  const authKey = React.useMemo(() => {
    return createCookiesAuthKey(window.hostUri?.toString());
  }, [window.hostUri]);

  React.useEffect(() => {
    if (Cookies.get(authKey)) {
      getCurrentAccount();
    }
  }, [authKey]);

  const _onSignMessage = React.useCallback(
    async (message) => {
      try {
        const signature = await onSignMessage(message);
        return signature;
      } catch (e) {
        throw new Error(e.message);
      }
    },
    [onSignMessage]
  );

  const _onSignInAndSetCookie = React.useCallback(
    async (signature, address) => {
      try {
        const { data } = await _onSignIn({
          address: address,
          signature,
        });

        if (!data?.authBySignature?.success) {
          throw new Error("Unable to sign in. Please try again later.");
        }

        Cookies.set(authKey, data.authBySignature.accessToken, {
          domain: config.COOKIE_DOMAIN,
          expires: 180,
        });
      } catch (e) {
        throw new Error(e.message);
      }
    },
    [_onSignIn]
  );

  const _onSigninCallback = async () => {
    try {
      // 1. get current account info
      await refetchCurrentAccount();
      // 2. refetch all queries
      await client.refetchQueries({
        include: "active",
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const onSignIn = async () => {
    toggleLoading(true);
    setError(null);
    try {
      // 1. get message to sign
      const { data } = await getAccountSigninMessage({
        address: currentAddress,
        chainId: 1,
      });

      const message = data?.AccountQuery?.getAccountSigninMessage;

      // 2. sign message
      const signature = await _onSignMessage(message);
      // 3. signin
      await _onSignInAndSetCookie(signature, currentAddress);

      // 3. refetch all queries
      await _onSigninCallback();

      toggleLoading(false);
    } catch (e) {
      toggleLoading(false);
      setError(e.message);
    }
  };

  // guest signin programatically generate a signature and sign in
  const onGuestSignin = async (wallet) => {
    toggleLoading(true);
    setError(null);

    const onCompleted = async (data) => {
      const message = data?.AccountQuery?.getAccountSigninMessage;

      // 2. sign message
      const signature = await wallet.signMessage(message);
      // 3. signin
      await _onSignInAndSetCookie(signature, wallet.address);
      // 3. refetch all queries
      await _onSigninCallback();

      toggleLoading(false);
    };

    // 1. get message to sign
    getAccountSigninMessage(
      {
        address: wallet.address,
        chainId: 1,
      },
      {
        onCompleted,
      }
    );
  };

  const onSignOut = async () => {
    toggleLoading(true);
    Cookies.remove(authKey, {
      domain: config.COOKIE_DOMAIN,
      expires: 180,
    });
    await client.resetStore();
    toggleLoading(false);
  };

  const onDisconnectWallet = async () => {
    await client.resetStore();
    client.cache.evict({
      id: `Account:${currentAccount?._id}`,
      broadcast: true,
    });
    onDisconnect();
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loading: loading,
        error,
        onSignIn,
        onSignOut,
        activeAddress,
        currentAccount,
        setCurrentWallet,
        currentWallet,
        onDisconnectWallet,
        onGuestSignin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
