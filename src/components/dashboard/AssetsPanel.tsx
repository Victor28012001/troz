import React from "react";
import type { GameUserProfile } from "../dashboard/UserProfilePanel";

interface AssetsPanelProps {
  user: GameUserProfile;
}

export const AssetsPanel: React.FC<AssetsPanelProps> = ({ user }) => {
  return (
    <section className="panel">
      <h2 className="font-michroma font-black " style={{ marginBottom: "1rem" }}>Assets</h2>
      <p>{user.username}, here are your achievements and points:</p>
      <p>Points: {user.points}</p>
      <ul>
        {user.achievements.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </section>
  );
};
