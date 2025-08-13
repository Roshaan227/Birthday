import { useEffect, useMemo, useRef, useState } from "react";

const baseWishes = [
  "Adventure Awaits",
  "Dream Big",
  "Endless Laughter",
  "Good Luck",
  "Hugs & Cake",
  "Surprise Gift",
  "Golden Moments",
  "Shiny Wins",
];

export default function WishWheel({ size = 340 }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const wheelRef = useRef(null);
  const hideTimerRef = useRef(0);

  const wishes = useMemo(() => baseWishes, []);
  const radius = size / 2 - 20;

  function spin() {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult("");
    setShowPopup(false);
    
    const extraTurns = 5 + Math.floor(Math.random() * 4); // 5-8 turns
    const targetSegmentIndex = Math.floor(Math.random() * wishes.length);
    const segmentAngle = 360 / wishes.length;
    const targetAngle = extraTurns * 360 + (360 - (targetSegmentIndex * segmentAngle + segmentAngle / 2));
    const nextRotation = rotation + targetAngle;
    setRotation(nextRotation);
    
    const duration = 4000 + Math.floor(Math.random() * 1000); // 4-5s
    
    window.setTimeout(() => {
      setIsSpinning(false);
      setResult(wishes[targetSegmentIndex]);
      setShowPopup(true);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = window.setTimeout(() => setShowPopup(false), 3000);
    }, duration + 100);
  }

  useEffect(() => () => { 
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current); 
  }, []);

  return (
    <div className="wheel-container">
      {/* Glowing background circle */}
      <div className="wheel-glow" />
      
      {/* Main wheel */}
      <div className="wheel-main">
        <div className="wheel-pointer-container">
          <div className={`wheel-pointer ${isSpinning ? "active" : ""}`}>
            <div className="pointer-arrow">▲</div>
            <div className="pointer-glow" />
          </div>
        </div>
        
        <div
          ref={wheelRef}
          className={`wheel ${isSpinning ? "spinning" : ""}`}
          onClick={spin}
          role="button"
          aria-label="Spin the wish wheel"
          style={{ 
            width: size, 
            height: size, 
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? `transform ${4 + Math.random()}s cubic-bezier(0.25, 0.46, 0.45, 0.94)` : "transform 0.1s ease"
          }}
        >
          {/* Wheel segments */}
          <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
            {wishes.map((_, i) => {
              const startAngle = (i * 360) / wishes.length;
              const endAngle = ((i + 1) * 360) / wishes.length;
              const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
              
              // Create arc path
              const x1 = size / 2 + radius * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = size / 2 + radius * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = size / 2 + radius * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = size / 2 + radius * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const path = [
                `M ${size / 2} ${size / 2}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              return (
                <g key={i}>
                  <path 
                    d={path} 
                    fill={`hsl(${(i * 360) / wishes.length}, 85%, 65%)`}
                    stroke="#ffffff40"
                    strokeWidth="2"
                    className="wheel-segment"
                  />
                  <path 
                    d={path} 
                    fill="none"
                    stroke="#ffffff80"
                    strokeWidth="1"
                    opacity="0.3"
                    className="segment-border"
                  />
                </g>
              );
            })}
            
            {/* Center circle */}
            <circle 
              cx={size / 2} 
              cy={size / 2} 
              r={radius * 0.15} 
              fill="url(#centerGradient)"
              stroke="#ffffff60"
              strokeWidth="3"
            />
            
            {/* Center gradient definition */}
            <defs>
              <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f0f0f0" />
              </radialGradient>
            </defs>
          </svg>
          
          {/* Overlay text */}
          {!isSpinning && !showPopup && (
            <div className="wheel-overlay">
              <div className="overlay-text">TAP TO SPIN</div>
              <div className="overlay-subtext">Make a wish!</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Result popup */}
      {showPopup && result && (
        <div className="wheel-pop">✨ {result} ✨</div>
      )}
    </div>
  );
}


