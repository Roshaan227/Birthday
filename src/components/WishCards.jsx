const wishes = [
  "May your year sparkle with joy!",
  "Adventure, laughter, and love await!",
  "Keep shining—you’re unstoppable!",
  "Cheers to more memories together!",
  "You make the world brighter!",
  "Stay awesome, stay you!",
  "Dream big and chase it!",
  "Let’s celebrate you—today and always!",
];

export default function WishCards() {
  return (
    <div className="wish-grid">
      {wishes.map((w, idx) => (
        <div key={idx} className="wish-card" tabIndex={0}>
          <div className="wish-inner">
            <div className="wish-front">🎁 Tap</div>
            <div className="wish-back">{w}</div>
          </div>
        </div>
      ))}
    </div>
  );
}


