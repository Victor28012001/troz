import React from "react";

interface UserProfileProps {
  user: GameUserProfile;
}

export interface GameUserProfile {
  avatarUrl: string;
  username: string;
  email: string;
  walletAddress: string;
  rank: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  points: number;
  achievements: string[];
  characters: string[];
  lobbies: string[];
  friends: {
    name: string;
    online: boolean;
  }[];
  upcomingEvents: {
    title: string;
    date: string;
  }[];
  recentMessages: {
    from: string;
    text: string;
  }[];
}

export const UserProfilePanel: React.FC<UserProfileProps> = ({ user }) => {
  const {
    avatarUrl,
    username,
    rank,
    level,
    xp,
    nextLevelXp,
    points,
    achievements,
    characters,
    lobbies,
    friends,
    upcomingEvents,
    recentMessages,
  } = user;

  const xpProgress = ((xp / nextLevelXp) * 100).toFixed(0);

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        padding: "2rem",
        background: "rgba(0, 0, 0, 0.05)",
        color: "white",
        fontFamily: "Michroma-Regular",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        textAlign: "left",
        alignItems: "center",
      }}
    >
      {/* Left column */}
      <div style={{maxWidth: "600px", width: "100%"}}>
        <h2 className="font-michroma font-black " style={{ marginBottom: "1rem" }}>Character Customization</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src={avatarUrl}
            alt="avatar"
            style={{ width: 80, height: 80, borderRadius: "50%" }}
          />
          <div style={{ textAlign: "left" }}>
            <h2 style={{ fontSize: "1rem" }}>{username}</h2>
            <p style={{ fontSize: "0.5rem" }}>Rank: {rank}</p>
          </div>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontSize: "0.8rem" }}>Level {level}</p>
          <div style={{width: "60%"}}>
            <div
              style={{
                background: "#555",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${xpProgress}%`,
                  background: "limegreen",
                  height: 12,
                }}
              />
            </div>
            <p style={{ fontSize: "0.5rem" }}>
              {xp} / {nextLevelXp} XP
            </p>
          </div>
        </div>

        <p style={{ marginTop: "1rem", fontSize: "0.8rem" }}>Points: {points}</p>

        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: "0.7rem" }}>Achievements</h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {achievements.map((ach, i) => (
              <span
                key={i}
                style={{
                  padding: "0.5rem",
                  background: "#333",
                  borderRadius: 4,
                }}
              >
                {ach}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: "0.7rem" }}>Characters</h3>
          <div>{characters.join(", ")}</div>
        </div>
      </div>

      {/* Right column */}
      <div style={{maxWidth: "600px", width: "100%"}}>
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: "0.7rem" }}>Active Lobbies</h3>
          <ul>
            {lobbies.map((lobby, i) => (
              <li key={i}>{lobby}</li>
            ))}
          </ul>
        </div>

        <div  style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: "0.7rem" }}>Friends</h3>
          <ul>
            {friends.map((f, i) => (
              <li key={i}>
                {f.name} {f.online ? "🟢" : "⚪"}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: "0.7rem" }}>Upcoming Events</h3>
          <ul>
            {upcomingEvents.map((e, i) => (
              <li key={i}>
                {e.title} — {e.date}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: "0.7rem" }}>Messages</h3>
          <ul>
            {recentMessages.map((m, i) => (
              <li key={i}>
                <strong>{m.from}:</strong> {m.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
