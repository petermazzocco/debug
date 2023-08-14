"use client";

import ConnectKit from "../components/ConnectKitButton";
import { useAccount } from "wagmi";
import { Connected, Disconnected } from "../components/Connection";

export default function ClaimTokens() {
  const { address } = useAccount();
  return (
    <div className="mt-24">
      <Disconnected>
        <div className="flex flex-col items-center space-y-4 justify-center">
          <p>Connect To View</p>
          <ConnectKit />
        </div>
      </Disconnected>
      <Connected>
        <div className="flex flex-col space-y-10 items-center">
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
          <div className="overflow-x-auto">
            <h2>Recent Journal Entries</h2>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th></th>
                  <td>Journal Entry 1</td>
                  <td>0/00/00</td>
                  <td>
                    <button className="btn btn-sm btn-secondary">Read</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Connected>
    </div>
  );
}
