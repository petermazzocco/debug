import { getDefaultConfig } from "connectkit";
import { createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";

const WC_ID = process.env.NEXT_PUBLIC_WALLETCONNECT as string;
const walletConnectProjectId = WC_ID;
const chains = [polygonMumbai];

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: "debug.",
    walletConnectProjectId,
    chains,
  })
);
