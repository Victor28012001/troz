import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    setMusicEnabled((prev) => !prev);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicEnabled) {
      audio.play().catch((err) => {
        console.warn("Audio play failed:", err);
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [musicEnabled]);

  return (
    <header
      style={{
        position: "fixed",
        top: "12px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          height: "4vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={toggleMusic}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid #6b7280",
            backgroundColor: "transparent",
            cursor: "pointer",
            padding: "6px",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              style={{
                width: "3px",
                height: "12px",
                backgroundColor: "#fff",
                transformOrigin: "center",
                animationName: musicEnabled ? "equalize" : "none",
                animationDuration: "1.5s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </button>
      </div>

      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/sounds/music.mp3"
        loop
        preload="auto"
      />

      {/* Equalizer animation */}
      <style>{`
        @keyframes equalize {
          0%   { transform: scaleY(1); }
          25%  { transform: scaleY(1.8); }
          50%  { transform: scaleY(0.6); }
          75%  { transform: scaleY(1.4); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </header>
  );
}
