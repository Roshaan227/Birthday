import { useState } from "react";
import { recipientName } from "../config";

export default function BirthdayWishes() {
  const [wishes, setWishes] = useState([
    { id: 1, text: "May your day be filled with joy and laughter! 🎉", author: "Family" },
    { id: 2, text: "Wishing you health, happiness, and success! 🌟", author: "Friends" },
    { id: 3, text: "Another year of amazing adventures awaits! 🚀", author: "Colleagues" },
    { id: 4, text: "May all your dreams come true this year! ✨", author: "Loved Ones" },
    { id: 5, text: "Here's to another fabulous year ahead! 🥂", author: "Well-wishers" },
    { id: 6, text: "You deserve all the happiness in the world! 💝", author: "Everyone" },
  ]);

  const [newWish, setNewWish] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const addWish = () => {
    if (newWish.trim() && newAuthor.trim()) {
      const wish = {
        id: Date.now(),
        text: newWish,
        author: newAuthor,
      };
      setWishes([...wishes, wish]);
      setNewWish("");
      setNewAuthor("");
    }
  };

  return (
    <div className="birthday-wishes">
      <h2 className="wishes-title">Birthday Wishes for {recipientName}</h2>
      <p className="wishes-subtitle">Share your heartfelt wishes and messages</p>
      
      <div className="add-wish-form">
        <input
          type="text"
          placeholder="Write your wish..."
          value={newWish}
          onChange={(e) => setNewWish(e.target.value)}
          className="wish-input"
        />
        <input
          type="text"
          placeholder="Your name..."
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          className="author-input"
        />
        <button onClick={addWish} className="add-wish-btn">
          Add Wish ✨
        </button>
      </div>

      <div className="wishes-grid">
        {wishes.map((wish) => (
          <div key={wish.id} className="wish-card">
            <div className="wish-text">{wish.text}</div>
            <div className="wish-author">— {wish.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
