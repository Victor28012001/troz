import React from "react";
import type { GameUserProfile } from "../dashboard/UserProfilePanel";

interface GamesPanelProps {
  user: GameUserProfile;
}

export const GamesPanel: React.FC<GamesPanelProps> = ({ user }) => {
  return (
    <section className="panel">
      <h2 className="font-michroma font-black " style={{ marginBottom: "1rem" }}>Games</h2>
      <p>Compete and rise, {user.username}!</p>
      <p>Your current rank: {user.rank}</p>
      <p>Level: {user.level} — XP: {user.xp}/{user.nextLevelXp}</p>
    </section>
  );
};
