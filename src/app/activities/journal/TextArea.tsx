"use client";
import { useState } from "react";
import DepositToast from "./DepositToast";

export default function TextArea() {
  const [wordCount, setWordCount] = useState(0);
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
      <label className="label">
        <span className="label-text">How are you feeling today?</span>
        <span
          className="label-text-alt tooltip"
          data-tip="1000 letters required to earn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-info-circle font-bold"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </span>
      </label>
      <textarea
        className="textarea textarea-bordered bg-secondary text-primary h-24 w-96"
        placeholder="Start typing..."
        onChange={handleInputChange}
      ></textarea>
      <label className="label">
        <span className="label-text-alt">{wordCount}</span>
        <span className="label-text-alt">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrows-expand"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8ZM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2ZM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10Z"
            />
          </svg>
        </span>
      </label>
      <button className="w-full btn btn-sm btn-accent mt-4">
        Submit Journal
      </button>
      {showDepositToast && <DepositToast />}
    </div>
  );
}
