import { useState } from "react";

export default function BirthdayGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const memories = [
    { id: 1, emoji: "🎂", title: "Birthday Cake", description: "Sweet moments with cake" },
    { id: 2, emoji: "🎈", title: "Balloons", description: "Floating dreams and wishes" },
    { id: 3, emoji: "🎁", title: "Gifts", description: "Surprises and joy" },
    { id: 4, emoji: "🎊", title: "Celebration", description: "Dancing and laughter" },
    { id: 5, emoji: "🌟", title: "Wishes", description: "Dreams coming true" },
    { id: 6, emoji: "💝", title: "Love", description: "Heartfelt moments" },
    { id: 7, emoji: "🎆", title: "Fireworks", description: "Bright celebrations" },
    { id: 8, emoji: "🎇", title: "Sparkles", description: "Magical moments" },
  ];

  return (
    <div className="birthday-gallery">
      <h2 className="gallery-title">Birthday Memories & Wishes</h2>
      <p className="gallery-subtitle">Every moment is a treasure to cherish</p>
      
      <div className="gallery-grid">
        {memories.map((memory) => (
          <div 
            key={memory.id} 
            className="gallery-item"
            onClick={() => setSelectedImage(memory)}
          >
            <div className="memory-emoji">{memory.emoji}</div>
            <h3 className="memory-title">{memory.title}</h3>
            <p className="memory-description">{memory.description}</p>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="gallery-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-emoji">{selectedImage.emoji}</div>
            <h3 className="modal-title">{selectedImage.title}</h3>
            <p className="modal-description">{selectedImage.description}</p>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
