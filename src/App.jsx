import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { recipientName, birthdayDate, themeColors } from "./config";
import GlowingHeading from "./components/GlowingHeading";
import Balloons from "./components/Balloons";
import ConfettiCanvas from "./components/ConfettiCanvas";
import FireworksCanvas from "./components/FireworksCanvas";
import Sparkles from "./components/Sparkles";
import WishWheel from "./components/WishWheel";
import WishCards from "./components/WishCards";
import PopupModal from "./components/PopupModal";
import RainbowTrail from "./components/RainbowTrail";
import BirthdayGallery from "./components/BirthdayGallery";
import BirthdayWishes from "./components/BirthdayWishes";
import HeartWishes from "./components/HeartWishes";
import { getNextBirthdayDate } from "./utils/date";

function App() {
  const [confettiKey, setConfettiKey] = useState(0);
  const [fireworksKey, setFireworksKey] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSurprise, setShowSurprise] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [showSparkles, setShowSparkles] = useState(true);
  const [showFireworks, setShowFireworks] = useState(true);

  // Set CSS variables for theme colors (mobile-first)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", themeColors.primary);
    root.style.setProperty("--color-secondary", themeColors.secondary);
    root.style.setProperty("--color-accent", themeColors.accent);
    root.style.setProperty("--color-glow", themeColors.glow);
    root.style.setProperty("--color-dark", themeColors.dark);
  }, []);

  useEffect(() => {
    // Initial confetti burst on load
    setTimeout(() => setConfettiKey((k) => k + 1), 300);
  }, []);

  const nextDate = useMemo(() => getNextBirthdayDate(birthdayDate), []);
  const dateLabel = useMemo(() => new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(nextDate), [nextDate]);

  return (
    <div className="app">
      <ConfettiCanvas isActive burstSignal={confettiKey} />
      {showFireworks && <FireworksCanvas isActive burstSignal={fireworksKey} />}
      {showSparkles && <Sparkles count={70} />}
      {showBalloons && <Balloons count={12} />}
      <RainbowTrail />

      <header className="hero full-screen">
        <GlowingHeading sub={`Let's celebrate on ${dateLabel}!`}>
          Happy Birthday, {recipientName}!
        </GlowingHeading>
        <p className="lead">
          Sending you vibrant wishes, sparkly vibes, and all the happiness.
        </p>
        <div className="hero-actions">
          <button className="cta xl" onClick={() => setShowSurprise(true)}>Open Surprise 🎉</button>
          <button className="ghost xl" onClick={() => setConfettiKey((k) => k + 1)}>Confetti Again</button>
        </div>
        <div className="chips">
          <button
            className={`chip ${showBalloons ? "on" : ""}`}
            onClick={() => setShowBalloons((v) => !v)}
          >
            🎈 Balloons
          </button>
          <button
            className={`chip ${showSparkles ? "on" : ""}`}
            onClick={() => setShowSparkles((v) => !v)}
          >
            ✨ Sparkles
          </button>
          <button
            className={`chip ${showFireworks ? "on" : ""}`}
            onClick={() => {
              if (!showFireworks) setShowFireworks(true);
              setFireworksKey((k) => k + 1);
            }}
          >
            🎆 Fireworks
          </button>
        </div>
      </header>

      <main className="snap-container">
        <section className="page page-cards">
          <h2 className="section-title">Little wishes for you</h2>
          <WishCards />
        </section>

        <section className="page page-tribute">
          <h2 className="section-title">A toast to {recipientName}</h2>
          <WishWheel size={340} />
        </section>

        <section className="page page-cta">
          <h2 className="section-title">Make a wish</h2>
          <button className="cta large" onClick={() => setConfettiKey((k) => k + 1)}>
            Blow the confetti 🎂
          </button>
          <p className="hint">Tap the button and watch the magic.</p>
        </section>

        <section className="page page-gallery">
          <BirthdayGallery />
        </section>

        <section className="page page-wishes">
          <BirthdayWishes />
        </section>

        <section className="page page-heart-wishes">
          <HeartWishes />
        </section>
      </main>

      <PopupModal
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
        title={`Welcome, ${recipientName}!`}
        centered
        className="modal-gradient"
      >
        <p>
          This page is all yours. Swipe through the surprises, tap the gifts, and enjoy the glow.
        </p>
      </PopupModal>

      <PopupModal
        isOpen={showSurprise}
        onClose={() => setShowSurprise(false)}
        title="A Birthday Surprise"
        centered
        className="modal-celebrate"
      >
        <div className="surprise">
          <div className="surprise-cake">🎂</div>
          <h3>Make a Wish!</h3>
          <p>May your year burst with color, joy, and unforgettable adventures.</p>
          <div className="surprise-actions">
            <button 
              className="cta huge" 
              onClick={() => {
                setConfettiKey((k) => k + 1);
                setShowSurprise(false);
              }}
            >
              Confetti Blast
            </button>
            <button 
              className="cta huge alt" 
              onClick={() => {
                setFireworksKey((k) => k + 1);
                setShowSurprise(false);
              }}
            >
              Launch Fireworks
            </button>
          </div>
        </div>
      </PopupModal>
    </div>
  );
}

export default App;
