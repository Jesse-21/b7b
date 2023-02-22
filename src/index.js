import React from "react";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig } from "wagmi";
import {
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import { wagmiClient, config } from "./helpers/make-wagmi-client";
import { theme } from "./helpers/create-theme";
import { AppRoutes } from "./AppRoutes";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={config.chains}
        theme={{
          lightMode: lightTheme(),
          darkMode: darkTheme(),
        }}
      >
        <ChakraProvider theme={theme}>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
