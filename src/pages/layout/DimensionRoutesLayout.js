import { WagmiConfig } from "wagmi";
import {
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { AuthContextProvider } from "../../context/AuthContext";
import { WalletContextProvider } from "../../context/WalletContext";

import "@rainbow-me/rainbowkit/styles.css";

import { wagmiClient, config } from "../../helpers/make-wagmi-client";

import { DimensionHeader } from "../../containers/navigation/DimensionHeader";

export const DimensionRoutesLayout = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={config.chains}
        theme={{
          lightMode: lightTheme(),
          darkMode: darkTheme(),
        }}
      >
        <WalletContextProvider>
          <AuthContextProvider>
            <DimensionHeader />
            {children}
          </AuthContextProvider>
        </WalletContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
