import { useUser } from "@civic/auth-web3/react";
import { useCallback } from "react";
import Logo from "/logo.png";

export default function Header() {
  const { signIn, user } = useUser();

  const doSignIn = useCallback(() => {
    console.log("[Page] Starting sign-in process");
    signIn()
      .then(() => {
        console.log("[Page] Sign in completed successfully");
      })
      .catch((error) => {
        console.error("[Page] Sign in failed:", error);
      });
  }, [signIn]);

  return (
    <header>
      {!user && (
        <div
          style={{
            width: "100%",
            height: "4vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: "0",
            left: "0",
            padding: "12px 2rem"
          }}
        >
          <img src={Logo} alt="logo" />
          <button
            onClick={doSignIn}
            style={{
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              borderRadius: "9999px",
              border: "1px solid #6b7280",
              padding: "6px",
              textAlign: "center",
              color: "#fff",
              fontSize: "small"
            }}
          >
            Sign in
          </button>
        </div>
      )}
    </header>
  );
}
