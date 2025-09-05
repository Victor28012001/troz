import React from "react";
import type { GameUserProfile } from "../dashboard/UserProfilePanel";

interface LobbyPanelProps {
  user: GameUserProfile;
}

export const LobbyPanel: React.FC<LobbyPanelProps> = ({ user }) => {
  return (
    <section className="panel">
      <h2 className="font-michroma font-black " style={{ marginBottom: "1rem" }}>Lobbies</h2>
      <p>Active Lobbies for {user.username}:</p>
      <ul>
        {user.lobbies.map((lobby, i) => (
          <li key={i}>{lobby}</li>
        ))}
      </ul>
    </section>
  );
};
