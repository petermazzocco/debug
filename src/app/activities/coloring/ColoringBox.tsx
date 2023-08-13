"use client";

import React, { useRef, useEffect, useState } from "react";
import DepositToast from "@/app/components/DepositToast";

export default function ColoringBox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000");
  const [drawnPixels, setDrawnPixels] = useState(0);
  const [hexcode, setHexcode] = useState("");
  const [paintedPositions, setPaintedPositions] = useState<
    { x: number; y: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.lineWidth = 5;
    context.lineCap = "round";
  }, []);

  const startPainting = () => {
    setIsPainting(true);
  };

  const stopPainting = () => {
    setIsPainting(false);
  };

  const paint = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isPainting) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.strokeStyle = currentColor;

    // Check if the current position has already been painted
    const isPainted = paintedPositions.some(
      (position) => position.x === x && position.y === y
    );

    if (!isPainted) {
      // Paint the new pixel with the current color
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();

      // Update the painted positions
      setPaintedPositions([...paintedPositions, { x, y }]);
    }
  };

  const handleColorChange = (newColor: string) => {
    setCurrentColor(newColor);
    setPaintedPositions([]);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    setDrawnPixels(0);
  };

  return (
    <div className="grid justify-center place-items-center">
      <h2 className="font-bold text-3xl py-4">Coloring Box</h2>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        style={{ border: "1px solid #000" }}
        onMouseDown={startPainting}
        onMouseUp={stopPainting}
        onMouseLeave={stopPainting}
        onMouseMove={paint}
        className="bg-secondary rounded-lg"
      />
      <div className="join">
        <button
          className="btn btn-sm bg-[#000] join-item"
          onClick={() => handleColorChange("#000")}
        >
          Choose Color
        </button>
      </div>
      <div className="pt-4">
        <button className="btn btn-ghost btn-sm" onClick={handleClearCanvas}>
          Clear
        </button>
      </div>
      {drawnPixels > 1000 && <DepositToast />}
    </div>
  );
}
