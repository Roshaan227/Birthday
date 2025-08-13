import { useEffect, useMemo } from "react";

export default function Sparkles({ count = 60 }) {
  const flakes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 2,
      hue: Math.floor(Math.random() * 360),
    }));
  }, [count]);

  useEffect(() => {}, []);

  return (
    <div className="sparkles" aria-hidden>
      {flakes.map((f) => (
        <span
          key={f.id}
          className="sparkle"
          style={{
            left: `${f.left}%`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            background: `radial-gradient(circle, hsl(${f.hue} 95% 70%), transparent 60%)`,
          }}
        />
      ))}
    </div>
  );
}


