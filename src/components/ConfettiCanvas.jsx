import { useEffect, useRef } from "react";

function createParticle(canvasWidth, canvasHeight) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 2 + Math.random() * 5;
  const size = 6 + Math.random() * 6;
  const lifetime = 60 + Math.random() * 60;
  const colors = ["#ff5bc8", "#7a5cff", "#00e5ff", "#ffe066", "#7dff85"];
  return {
    x: canvasWidth / 2,
    y: canvasHeight / 4,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size,
    rotation: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: lifetime,
    maxLife: lifetime,
    shape: Math.random() > 0.5 ? "rect" : "circle",
  };
}

export default function ConfettiCanvas({ isActive = true, burstSignal = 0 }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const gravity = 0.05;

    function step() {
      ctx.clearRect(0, 0, width, height);
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
      for (const p of particlesRef.current) {
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;
        p.life -= 1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    const amount = 180;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    for (let i = 0; i < amount; i += 1) {
      particlesRef.current.push(createParticle(width, height));
    }
  }, [burstSignal, isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="confetti-canvas"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}


