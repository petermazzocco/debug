"use client";
import { useState } from "react";
import DepositToast from "../../components/DepositToast";
import { useAccount } from "wagmi";
import { Connected, Disconnected } from "../../components/Connection";
import ConnectKit from "../../components/ConnectKitButton";

export default function TextArea() {
  const [wordCount, setWordCount] = useState(0);
  const [showDepositToast, setShowDepositToast] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [lastEntry, setLastEntry] = useState("");

  const handleInputChange = (e: any) => {
    const inputText = e.target.value;
    const lettersCount = inputText.replace(/\s+/g, "").length;
    setWordCount(lettersCount);

    if (lettersCount > 1000) {
      setShowDepositToast(true);
      setTimeout(() => {
        setShowDepositToast(false);
      }, 5000);
    } else {
      setShowDepositToast(false);
    }

    if (lettersCount >= 300) {
      setDisableSubmit(false);
    } else if (lettersCount < 300) {
      setDisableSubmit(true);
    }
  };

  return (
    <div className="form-control">
      <div>
        <h2 className="font-bold text-3xl py-4">Relief Journal</h2>
      </div>
      <Disconnected>
        <div className="flex flex-col items-center space-y-4 justify-center">
          <p>Connect To View</p>
          <ConnectKit />
        </div>
      </Disconnected>
      <Connected>
        <label className="label">
          <span className="label-text">
            Earn $BUG when you hit 1000 letters.
          </span>
          <span className="label-text-alt tooltip" data-tip="More Info">
            <span className="text-xs hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-info-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </span>
          </span>
        </label>
        <div className="space-y-2 grid justify-center">
          <input
            className="input input-bordered bg-secondary text-primary h-10"
            placeholder="Title your entry..."
          ></input>
          <textarea
            className="textarea textarea-bordered bg-secondary text-primary h-60 w-96"
            placeholder="How are you feeling today?"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <label className="label">
          <span className="label-text-alt">
            {wordCount} letters (min. 300 required)
          </span>
          <span className="label-text-alt">Last Entry: 0/00/00</span>
        </label>
        <button
          className="w-full btn btn-sm btn-accent mt-4"
          disabled={disableSubmit}
        >
          Submit Journal
        </button>
        {showDepositToast && <DepositToast />}
      </Connected>
    </div>
  );
}
