import { WagmiConfig } from "wagmi";
import {
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import { wagmiClient, config } from "../../helpers/make-wagmi-client";

import "@rainbow-me/rainbowkit/styles.css";

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
        Dimension Routes Layout!
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
