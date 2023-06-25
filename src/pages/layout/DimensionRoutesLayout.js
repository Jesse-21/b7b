import { WagmiConfig } from "wagmi";
import {
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { AuthContextProvider } from "../../context/AuthContext";
import { AuthModalContextProvider } from "../../context/AuthModal";
import { WalletContextProvider } from "../../context/WalletContext";

import "@rainbow-me/rainbowkit/styles.css";

import { wagmiClient, config } from "../../helpers/make-wagmi-client";

import { DimensionHeader } from "../../containers/navigation/DimensionHeader";

export const DimensionRoutesLayout = ({ children }) => {
  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider
        chains={config.chains}
        theme={{
          lightMode: lightTheme(),
          darkMode: darkTheme(),
        }}
      >
        <WalletContextProvider>
          <AuthContextProvider>
            <AuthModalContextProvider>
              <DimensionHeader />
              {children}
            </AuthModalContextProvider>
          </AuthContextProvider>
        </WalletContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
