"use client";

import { ConnectKitProvider } from "connectkit";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import { config } from "../wagmi";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        customTheme={{
          "--ck-overlay-background": "rgba(0, 0, 0, 0.5)",
          "--ck-connectbutton-font-size": ".7rem",
          "--ck-connectbutton-color": "#000000",
          "--ck-connectbutton-background": "#FBFFF1",
          "--ck-body-background": "#FBFFF1",
          "--ck-body-color": "#000000",
          "--ck-font-family": "Quicksand",
          "--ck-connectbutton-border-radius": "0.4rem",
        }}
      >
        {mounted && children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
