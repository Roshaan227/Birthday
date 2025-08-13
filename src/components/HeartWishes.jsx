import { useEffect, useRef, useState } from "react";
import { recipientName, themeColors } from "../config";

const wishesList = [
  "Love & Joy 💝",
  "Happiness ✨",
  "Success 🚀",
  "Health 🌟",
  "Adventure 🎯",
  "Peace 🕊️",
  "Friendship 🤝",
  "Dreams 💭"
];

// Use only theme colors
const bubbleColors = [
  themeColors.primary,
  themeColors.secondary,
  themeColors.accent,
  themeColors.glow
];

export default function HeartWishes() {
  const canvasRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);
  const [frame, setFrame] = useState(0);

  // Animate bubbles
  useEffect(() => {
    const interval = setInterval(() => setFrame(f => f + 1), 16);
    return () => clearInterval(interval);
  }, []);

  // Add new bubble every ~1.5s
  useEffect(() => {
    if (frame % 90 === 0) {
      setBubbles(bubs => [
        ...bubs,
        {
          x: 0,
          y: 0,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -1.2 - Math.random() * 0.8,
          // base radius in CSS pixels; scaled by dpr when drawing
          r: 40 + Math.random() * 24,
          color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
          text: wishesList[Math.floor(Math.random() * wishesList.length)],
          opacity: 1,
          life: 0,
          swayPhase: Math.random() * Math.PI * 2,
          swayAmp: 0.6 + Math.random() * 0.8
        }
      ]);
    }
  }, [frame]);

  // Animate and draw
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth * dpr;
    const height = canvas.offsetHeight * dpr;
    canvas.width = width;
    canvas.height = height;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Heart position
    const heartX = width / 2;
    const heartSize = Math.min(width, height) * 0.4; // larger heart
    const scaleFactor = heartSize / 100;
    const heartY = height - 20 * dpr - heartSize; // keep tip slightly above bottom

    // Draw big heart (SVG path)
    ctx.save();
    ctx.translate(heartX, heartY);
    const heartPulseScale = 1 + Math.sin(frame * 0.08) * 0.02;
    ctx.scale((heartSize / 100) * heartPulseScale, (heartSize / 100) * heartPulseScale);
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.bezierCurveTo(0, 0, -50, 0, -50, 30);
    ctx.bezierCurveTo(-50, 55, 0, 80, 0, 100);
    ctx.bezierCurveTo(0, 80, 50, 55, 50, 30);
    ctx.bezierCurveTo(50, 0, 0, 0, 0, 30);
    ctx.closePath();
    ctx.shadowColor = themeColors.primary;
    ctx.shadowBlur = 40 * dpr;
    ctx.fillStyle = `url(#heartGradient)`;
    // Fallback if no gradient
    ctx.fillStyle = themeColors.primary;
    ctx.globalAlpha = 0.95;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();

    // Draw gradient overlay (simulate SVG gradient)
    ctx.save();
    ctx.translate(heartX, heartY);
    ctx.scale((heartSize / 100) * heartPulseScale, (heartSize / 100) * heartPulseScale);
    const grad = ctx.createLinearGradient(-50, 0, 50, 100);
    grad.addColorStop(0, themeColors.primary);
    grad.addColorStop(0.5, themeColors.secondary);
    grad.addColorStop(1, themeColors.accent);
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.bezierCurveTo(0, 0, -50, 0, -50, 30);
    ctx.bezierCurveTo(-50, 55, 0, 80, 0, 100);
    ctx.bezierCurveTo(0, 80, 50, 55, 50, 30);
    ctx.bezierCurveTo(50, 0, 0, 0, 0, 30);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();

    // Animate and draw bubbles
    setBubbles(bubs =>
      bubs
        .map(bub => {
          // Bubble starts at heart tip
          if (bub.life === 0) {
            bub.x = heartX + (Math.random() - 0.5) * 10 * dpr;
            // emit from near top-center of heart shape
            bub.y = heartY + 20 * scaleFactor;
          }
          // base movement
          bub.x += bub.vx * dpr;
          bub.y += bub.vy * dpr;
          // gentle horizontal sway
          bub.x += Math.sin(bub.life * 0.05 + bub.swayPhase) * bub.swayAmp * dpr;
          // very slight acceleration upward
          bub.vy -= 0.0006;
          bub.life++;
          // slower fade for readability (longer lifetime)
          bub.opacity -= 0.0022;
          return bub;
        })
        .filter(bub => bub.opacity > 0)
    );

    // Draw all bubbles
    bubbles.forEach(bub => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, bub.opacity);
      ctx.beginPath();
      ctx.arc(bub.x, bub.y, bub.r * dpr, 0, Math.PI * 2);
      ctx.fillStyle = bub.color;
      ctx.shadowColor = bub.color;
      ctx.shadowBlur = 18 * dpr;
      ctx.fill();
      ctx.globalAlpha = Math.max(0, bub.opacity * 0.95);
      ctx.font = `${22 * dpr}px Arial Black, Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // outline then fill for contrast
      ctx.lineWidth = 4 * dpr;
      ctx.strokeStyle = "rgba(0,0,0,0.55)";
      ctx.strokeText(bub.text, bub.x, bub.y);
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 8 * dpr;
      ctx.shadowColor = "rgba(0,0,0,0.35)";
      ctx.fillText(bub.text, bub.x, bub.y);
      ctx.restore();
    });
  }, [bubbles, frame]);

  return (
    <div className="heart-wishes-section">
      <div className="heart-wishes-content">
        <h2 className="heart-wishes-title">
          Sending Love & Wishes to {recipientName} 💖
        </h2>
        <p className="heart-wishes-subtitle">
          Every wish floats from the heart just for you
        </p>
      </div>
      <div className="canvas-container">
        <canvas ref={canvasRef} className="heart-canvas" />
      </div>
    </div>
  );
}
