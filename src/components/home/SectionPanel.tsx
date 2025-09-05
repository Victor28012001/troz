// components/SectionPanel.tsx
import React, { useEffect, useState, useCallback } from "react";
import { useUser } from "@civic/auth-web3/react";

interface SectionPanelProps {
  id: string;
  title: string;
}

export const SectionPanel: React.FC<SectionPanelProps> = ({ id, title }) => {
  const { signIn, user } = useUser();
  let imgSrc;

  const [buttonWidth, setButtonWidth] = useState(() => {
    const width = window.innerWidth;
    return width <= 1024 ? "80vw" : "20vw";
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setButtonWidth(width <= 1024 ? "80vw" : "20vw");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const doSignIn = useCallback(() => {
    signIn().catch(console.error);
  }, [signIn]);

  const getButtonText = () => {
    if (user) return null;

    switch (id) {
      case "intro":
        return "Enter TOZ";
      case "panel-1":
        return "Customize Your Character";
      case "panel-2":
        return "Build Your World";
      case "panel-3":
        return "Equip Your Character";
      case "panel-4":
        return "Join the Chat";
      case "panel-5":
        return "Compete";
      default:
        return "Join TOZ";
    }
  };

  const getCTA = () => {
    switch (id) {
      case "intro":
        imgSrc = "/images/others/btn-bg.jpeg"
        return "Step into the world of TOZ and begin your journey.";
      case "panel-1":
        imgSrc = "none"
        return "Design your unique avatar with style and flair.";
      case "panel-2":
        imgSrc = "none"
        return "Start building your own immersive experience.";
      case "panel-3":
        imgSrc = "none"
        return "Gear up to stand out and prepare for battle.";
      case "panel-4":
        imgSrc = "none"
        return "Chat and connect with other explorers.";
      case "panel-5":
        imgSrc = "none"
        return "Prove yourself in games and rise to the top.";
      default:
        return "";
    }
  };

  const buttonText = getButtonText();
  const ctaText = getCTA();

  return (
    <section
      id={id}
      className="panel"
      style={{
        width: "100vw",
        // flex: "0 0 100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontSize: "2.5rem",
        userSelect: "none",
        background: "transparent",
        position: "relative", // important to anchor absolutely positioned button
      }}
    >
      <h2 className="font-michroma font-black " style={{ marginBottom: "1rem" }}>{title}</h2>
      {!user && buttonText && (
        <>
          <p
            style={{
              fontSize: "1rem",
              maxWidth: "80%",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {ctaText}
          </p>
          <div
            style={{
              position: "absolute", // changed from fixed
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 30,
              width: buttonWidth,
            }}
          >
            <button
              onClick={doSignIn}
              style={{
                padding: "12px",
                width: "100%",
                cursor: "pointer",
                borderRadius: "9999px",
                border: "1px solid gray",
                color: "white",
                fontFamily: 'Michroma-Regular',
                backgroundImage: imgSrc !== "none" ? `url(${imgSrc})` : "none",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                fontSize: "small",
              }}
            >
              {buttonText}
            </button>
          </div>
        </>
      )}
    </section>
  );
};
