import { CivicAuthProvider } from "@civic/auth-web3/react";
import Header from "./components/shared/Header";
import Hero3D from "./components/home/Hero3D";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

function App() {
  return (
    <CivicAuthProvider clientId={CLIENT_ID}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          position: "relative",
        }}
      >
        <Header />
        <Hero3D />
      </div>
    </CivicAuthProvider>
  );
}

export default App;
