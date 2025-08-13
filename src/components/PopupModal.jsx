export default function PopupModal({ isOpen, onClose, title, children, className = "", centered = false }) {
  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""} ${centered ? "center" : ""}`} onClick={onClose}>
      <div
        className={`modal-card ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}


