import { useMemo } from "react";
import { recipientName } from "../config";

const baseMessages = [
  { emoji: "🌟", title: "Shine On", text: "Your energy lights up every room." },
  { emoji: "🎉", title: "Big Cheers", text: "Today is all about you—celebrate big!" },
  { emoji: "💫", title: "Magic", text: "Everything you touch turns brighter." },
  { emoji: "🧁", title: "Sweet", text: "Life is sweeter with you around." },
  { emoji: "🫶", title: "Bestie", text: "Thanks for being a real one, always." },
  { emoji: "🔥", title: "Bold", text: "Keep chasing dreams with fearless heart." },
  { emoji: "🌈", title: "Color", text: "You add color to every moment." },
  { emoji: "🚀", title: "Go Far", text: "The year ahead is yours to conquer." },
];

export default function TributeBoard() {
  const items = useMemo(() => {
    return baseMessages.map((m, i) => ({
      ...m,
      hue: Math.floor((i * 47 + 20) % 360),
      badge: i % 2 === 0 ? "From Friends" : "For You",
    }));
  }, []);

  return (
    <div className="tribute-grid">
      {items.map((it, idx) => (
        <article
          key={idx}
          className="tribute-card"
          style={{
            background: `linear-gradient(160deg, hsl(${it.hue} 90% 65% / 0.35), hsl(${(it.hue + 40) % 360} 90% 55% / 0.35))`,
          }}
        >
          <div className="tribute-inner">
            <div className="tribute-emoji">{it.emoji}</div>
            <div className="tribute-badge">{it.badge}</div>
            <h3 className="tribute-title">{it.title} {recipientName}</h3>
            <p className="tribute-text">{it.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}


