import React from "react";
import type { GameUserProfile } from "../dashboard/UserProfilePanel";

interface ChatPanelProps {
  user: GameUserProfile;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ user }) => {
  return (
    <section className="panel">
      <h2 className="font-michroma font-black " style={{ marginBottom: "1rem", fontSize: "2rem" }}>Chat</h2>
      <p>Recent messages for {user.username}:</p>
      <ul>
        {user.recentMessages.map((m, i) => (
          <li key={i}>
            <strong>{m.from}:</strong> {m.text}
          </li>
        ))}
      </ul>
    </section>
  );
};
