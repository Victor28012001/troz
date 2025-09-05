import type { GameUserProfile } from "../components/dashboard/UserProfilePanel"; // adjust import as needed

export const getEmptyUserProfile = (overrides?: Partial<GameUserProfile>): GameUserProfile => {
  return {
    avatarUrl: "",
    username: "Guest",
    email: "",
    walletAddress: "",
    rank: "Unranked",
    level: 0,
    xp: 0,
    nextLevelXp: 100,
    points: 0,
    achievements: [],
    characters: [],
    lobbies: [],
    friends: [],
    upcomingEvents: [],
    recentMessages: [],
    ...overrides, // allow custom values to override defaults
  };
};
