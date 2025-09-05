import React from "react";
import type { GameUserProfile } from "../dashboard/UserProfilePanel";

interface CharacterPanelProps {
  user: GameUserProfile;
}

export const CharacterPanel: React.FC<CharacterPanelProps> = ({ user }) => {
  return (
    <section className="panel">
      <h2 className="font-michroma font-black " style={{ marginBottom: "1rem" }}>Character Customization</h2>
      <p>Welcome {user.username}, customize your avatar here!</p>
      <ul>
        {user.characters.map((char, i) => (
          <li key={i}>{char}</li>
        ))}
      </ul>
    </section>
  );
};
