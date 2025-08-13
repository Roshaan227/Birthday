import { useMemo } from "react";

export default function Balloons({ count = 10 }) {
  const balloons = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      delay: Math.random() * 6,
      scale: 0.7 + Math.random() * 0.8,
      hue: Math.floor(Math.random() * 360),
    }));
  }, [count]);

  return (
    <div className="balloons" aria-hidden>
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon"
          style={{
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            transform: `scale(${b.scale})`,
            background: `hsl(${b.hue} 80% 60%)`,
            boxShadow: `0 0 18px hsl(${b.hue} 90% 60% / 0.6) inset` ,
          }}
        >
          <span className="string" />
        </div>
      ))}
    </div>
  );
}


