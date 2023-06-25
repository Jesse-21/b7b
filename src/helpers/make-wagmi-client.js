import { configureChains, createConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

const { chains, provider, webSocketProvider, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "b7b.xyz",
  chains,
  // Grab one from https://cloud.walletconnect.com
  projectId: "07d315dc8689f7c6c9fbef9a78fa6e1c",
});

export const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export const config = {
  chains,
  connectors,
  provider,
  webSocketProvider,
};
