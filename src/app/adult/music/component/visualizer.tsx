"use client";

import { useEffect, useRef, useState } from "react";

interface AudioVisualizerProps {
  audioData: Uint8Array | null;
  isPlaying: boolean;
}

export default function AudioVisualizer({
  audioData,
  isPlaying,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(null);
  const [lastAudioData, setLastAudioData] = useState<Uint8Array | null>(null);

  useEffect(() => {
    if (audioData) {
      setLastAudioData(new Uint8Array(audioData));
    }
  }, [audioData]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const draw = (data: Uint8Array) => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerY = rect.height / 2;
      const sliceWidth = (rect.width * 1.0) / data.length;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, rect.width, 0);
      gradient.addColorStop(0, "#6366f1");
      gradient.addColorStop(0.3, "#ec4899");
      gradient.addColorStop(0.6, "#f97316");
      gradient.addColorStop(1, "#22c55e");

      ctx.lineWidth = 10;
      ctx.strokeStyle = gradient;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#6366f1";
      ctx.beginPath();

      let x = 0;
      for (let i = 0; i < data.length; i++) {
        const v = data[i] / 255;
        const y = v * rect.height * 0.5;

        if (i === 0) {
          ctx.moveTo(x, centerY - y);
        } else {
          ctx.lineTo(x, centerY - y);
        }

        x += sliceWidth;
      }

      ctx.stroke();
    };

    if (isPlaying) {
      const renderFrame = () => {
        if (audioData) {
          draw(audioData);
        }
        animationFrameId.current = requestAnimationFrame(renderFrame);
      };
      animationFrameId.current = requestAnimationFrame(renderFrame);
    } else if (lastAudioData) {
      // When paused, draw the last frame we received
      draw(lastAudioData);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [audioData, isPlaying, lastAudioData]);

  return <canvas ref={canvasRef} className="w-full h-500 z-10" />;
}
