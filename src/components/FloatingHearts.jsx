import { useMemo } from "react";

export default function FloatingHearts({ count = 15 }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      size: 12 + Math.random() * 16,
      duration: 8 + Math.random() * 6,
      color: `hsl(${Math.floor(Math.random() * 60) + 320}, 90%, 70%)`,
    }));
  }, [count]);

  return (
    <div className="floating-hearts" aria-hidden>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            color: h.color,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}
