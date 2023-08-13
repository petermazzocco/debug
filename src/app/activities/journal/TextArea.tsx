"use client";
import { useState } from "react";
import DepositToast from "../../components/DepositToast";
import { useAccount } from "wagmi";
import { Connected, Disconnected } from "../../components/Connection";
import ConnectKit from "../../components/ConnectKitButton";

export default function TextArea() {
  const [wordCount, setWordCount] = useState(0);
  const { address } = useAccount();
  const [showDepositToast, setShowDepositToast] = useState(false);

  const handleInputChange = (e: any) => {
    const inputText = e.target.value;
    const lettersCount = inputText.replace(/\s+/g, "").length;
    setWordCount(lettersCount);

    // Check if the letter count is divisible by 100 and greater than 0
    if (lettersCount > 1000) {
      // Trigger the DepositToast component here if 100 letters have been typed
      setShowDepositToast(true);
      setTimeout(() => {
        setShowDepositToast(false);
      }, 5000);
    } else {
      setShowDepositToast(false);
    }
  };

  return (
    <div className="form-control">
      <h2 className="font-bold text-3xl py-4">Relief Journal</h2>
      <Disconnected>
        <div className="grid justify-center place-items-center">
          <ConnectKit />
        </div>
      </Disconnected>
      <Connected>
        <label className="label">
          <span className="label-text">How are you feeling today?</span>
          <span className="label-text-alt tooltip" data-tip="Connected Address">
            <span className="text-xs">
              {address?.slice(0, 2)}...{address?.slice(-4)}
            </span>
          </span>
        </label>
        <textarea
          className="textarea textarea-bordered bg-secondary text-primary h-24 w-96"
          placeholder="Start typing..."
          onChange={handleInputChange}
        ></textarea>
        <label className="label">
          <span className="label-text-alt">{wordCount}</span>
        </label>
        <button className="w-full btn btn-sm btn-accent mt-4">
          Submit Journal
        </button>
        {showDepositToast && <DepositToast />}
      </Connected>
    </div>
  );
}
