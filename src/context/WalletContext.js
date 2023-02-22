/* eslint-disable no-inline-comments */
/* eslint-disable no-empty-function */
import React from "react";
import { useAccount, useProvider, useSignMessage, useDisconnect } from "wagmi";
import Cookies from "js-cookie";

import { config } from "../config";
/**
 * Context for the registar page to register a new token
 */
export const WalletContext = React.createContext({
  loading: false,
  error: null,
  onSignMessage: () => {},
  setCurrentWallet: () => {},
  provider: null,
  currentAddress: null,
  currentWallet: null,
  onDisconnect: () => {},
});
WalletContext.displayName = "WalletContext";

const Wallets = {
  Metamask: "Metamask",
  "Wallet Connect": "Wallet Connect",
  Email: "Email",
};

const WagmiWallets = {
  metaMask: "Metamask",
  walletConnect: "Wallet Connect",
};

export const useWalletContext = () => React.useContext(WalletContext);

export const WalletContextProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [currentWallet, _setCurrentWallet] = React.useState(null);

  const { address, isConnecting, isReconnecting, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const provider = useProvider();
  const { signMessageAsync } = useSignMessage();

  const isLoading = React.useMemo(() => {
    return isConnecting || isReconnecting || loading;
  }, [isConnecting, isReconnecting, loading]);

  const setCurrentWallet = (wallet) => {
    Cookies.set("beb_provider", Wallets[wallet] || null, {
      domain: config.COOKIE_DOMAIN,
      expires: 180,
    });
    _setCurrentWallet(Wallets[wallet] || null);
  };

  React.useEffect(() => {
    /** * Current Wallet */
    const wallet = Cookies.get("beb_provider");
    setCurrentWallet(wallet);
  }, []);

  React.useEffect(() => {
    if (connector) {
      setCurrentWallet(WagmiWallets[connector.id]);
    } else {
      setCurrentWallet(null);
    }
  }, [connector]);

  const onSignMessage = async (message) => {
    try {
      setLoading(true);
      const signature = await signMessageAsync({ message });
      setLoading(false);
      return signature;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  const onDisconnect = () => {
    disconnect();
    setCurrentWallet(null);
  };
  return (
    <WalletContext.Provider
      value={{
        loading: isLoading,
        currentAddress: address,
        onSignMessage,
        currentWallet,
        provider,
        error,
        setCurrentWallet,
        onDisconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
