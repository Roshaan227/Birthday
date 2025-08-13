import { useEffect, useRef } from "react";

function createRocket(width, height) {
  const x = Math.random() * width * 0.8 + width * 0.1;
  const y = height + 10;
  const targetY = height * (0.25 + Math.random() * 0.25);
  return {
    type: "rocket",
    x,
    y,
    vx: (Math.random() - 0.5) * 1.2,
    vy: -6 - Math.random() * 2.5,
    targetY,
    life: 120,
    color: `hsl(${Math.floor(Math.random() * 360)} 90% 65%)`,
  };
}

function explode(rocket) {
  const particles = [];
  const count = 60 + Math.floor(Math.random() * 40);
  const baseHue = Math.floor(Math.random() * 360);
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    const speed = 2 + Math.random() * 4;
    particles.push({
      type: "spark",
      x: rocket.x,
      y: rocket.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 60 + Math.random() * 30,
      maxLife: 90,
      size: 2 + Math.random() * 2,
      color: `hsl(${(baseHue + Math.random() * 40) % 360} 95% 70%)`,
    });
  }
  return particles;
}

export default function FireworksCanvas({ isActive = true, burstSignal = 0 }) {
  const canvasRef = useRef(null);
  const itemsRef = useRef([]);
  const rafRef = useRef(0);
  const autoIntervalRef = useRef(0);

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

    function step() {
      ctx.clearRect(0, 0, width, height);
      // Draw, update
      const next = [];
      for (const it of itemsRef.current) {
        if (it.type === "rocket") {
          it.x += it.vx;
          it.y += it.vy;
          it.vy += 0.02; // slight gravity
          it.life -= 1;
          // draw tail
          ctx.fillStyle = it.color;
          ctx.beginPath();
          ctx.arc(it.x, it.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
          if (it.y <= it.targetY || it.life <= 0) {
            next.push(...explode(it));
          } else {
            next.push(it);
          }
        } else {
          // spark
          it.x += it.vx;
          it.y += it.vy;
          it.vy += 0.04;
          it.life -= 1;
          const t = Math.max(it.life / it.maxLife, 0);
          ctx.globalAlpha = t;
          ctx.fillStyle = it.color;
          ctx.beginPath();
          ctx.arc(it.x, it.y, it.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
          if (it.life > 0) next.push(it);
        }
      }
      itemsRef.current = next;
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
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    // Launch a few rockets per burst
    const rockets = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < rockets; i += 1) {
      itemsRef.current.push(createRocket(width, height));
    }
  }, [burstSignal, isActive]);

  // Auto-launch rockets at a medium pace while active
  useEffect(() => {
    if (!isActive) return;
    const tickMs = 1600; // medium cadence
    const run = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const rockets = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < rockets; i += 1) {
        itemsRef.current.push(createRocket(width, height));
      }
    };
    run(); // fire one immediately
    autoIntervalRef.current = window.setInterval(run, tickMs);
    return () => window.clearInterval(autoIntervalRef.current);
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fireworks-canvas"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 6 }}
    />
  );
}


