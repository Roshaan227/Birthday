export default function GlowingHeading({ children, sub }) {
  return (
    <div className="glow-wrap">
      <h1 className="glow-text">{children}</h1>
      {sub ? <p className="glow-sub">{sub}</p> : null}
    </div>
  );
}


