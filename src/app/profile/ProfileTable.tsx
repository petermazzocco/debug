"use client";

import ConnectKit from "../components/ConnectKitButton";
import { useAccount } from "wagmi";
import { Connected, Disconnected } from "../components/Connection";

export default function ClaimTokens() {
  const { address, isConnected } = useAccount();
  return (
    <div className="mt-24">
      <Disconnected>
        <ConnectKit />
      </Disconnected>
      <Connected>
        <div className="flex flex-col space-y-10 items-center justify-center">
          <div className="indicator">
            <span className="indicator-item badge badge-accent">
              {address?.slice(0, 3)}...{address?.slice(-4)}
            </span>
            <div className="stats shadow bg-secondary text-primary w-60">
              <div className="stat">
                <div className="stat-title text-accent">Available Tokens:</div>
                <div className="stat-value">0 BUG</div>
                <div className="stat-desc text-accent">Recent Claim: 0 BUG</div>
                <div className="stat-actions">
                  <button className="btn btn-neutral btn-sm w-full">
                    Claim Tokens
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Connected>
    </div>
  );
}
