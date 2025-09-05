import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CurvedAnimatedText } from "./CurvedAnimatedText";
import { Model } from "./Model";
import {
  EffectComposer,
  Bloom,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { SectionPanel } from "./SectionPanel";
import { MapNavigation } from "./MapNavigation";
import { AnimatePresence, motion } from "framer-motion";
import { CameraRig } from "./CameraRig";
import { FloatingModel } from "./FloatingModel";
import { UserProfilePanel } from "../dashboard/UserProfilePanel";
import { getEmptyUserProfile } from "../../utils/getEmptyUserProfile";
import { useUser, useWallet } from "@civic/auth-web3/react";
// import { userHasWallet } from '@civic/auth-web3';

const panels = [
  { id: "intro", title: "Introduction" },
  { id: "panel-1", title: "Character" },
  { id: "panel-2", title: "Lobby" },
  { id: "panel-3", title: "Assets" },
  { id: "panel-4", title: "Chat" },
  { id: "panel-5", title: "Games" },
];

export default function Hero3D() {
  const { user } = useUser();
  const { address } = useWallet({ type: "solana"});

  const fullUserProfile = getEmptyUserProfile({
    username: user?.username || "Unknown",
    email: user?.email || "",
    walletAddress: address || "",
    avatarUrl: user?.picture || "", // or whatever field you have
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [panelsVisible, setPanelsVisible] = useState(true);
  const [position1, setPosition1] = useState<[number, number, number]>([
    5, 10, 5,
  ]);
  const [intensity, setIntensity] = useState(0.2);
  const [color, setColor] = useState("#fff");

  // Update position and intensity when activeIndex changes
  useEffect(() => {
    switch (activeIndex) {
      case 2:
      case 5:
        setPosition1([5, 10, 5]);
        setIntensity(0.5);
        setColor("#fff");
        break;

      case 4:
        setPosition1([5, 10, 5]);
        setIntensity(0.6);
        setColor("#fff");
        break;

      case 3:
        setPosition1([-1.2, -1, 0.5]);
        setIntensity(0.6);
        setColor("#fff");
        break;

      default:
        setPosition1([5, 10, 5]);
        setIntensity(0.2);
        setColor("#fff");
        break;
    }
  }, [activeIndex]);

  return (
    <div style={{ position: "relative" }}>
      <MapNavigation
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        panelsVisible={panelsVisible}
        setPanelsVisible={setPanelsVisible}
      />

      {/* Background Title */}
      <div
        className="absolute inset-0 flex items-start justify-center pointer-events-none z-0"
        style={{ position: "fixed", inset: 0 }}
      >
        <h1
          className="text-[24vw] font-electro font-extrabold text-[#fff] opacity-10 select-none"
          style={{
            color: "#fff",
            opacity: "1",
            fontSize: "50vw",
            userSelect: "none",
          }}
        >
          TOZ
        </h1>
      </div>

      {/* 3D Scene */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <Canvas dpr={[1, 2]}>
          <directionalLight
            position={position1}
            intensity={intensity}
            color={color}
          />
          <Suspense fallback={null}>
            <CameraRig activeIndex={activeIndex} />
            <Model activeIndex={activeIndex} />
            <CurvedAnimatedText />

            {activeIndex === 2 && (
              <FloatingModel
                url="/models/lobby.glb"
                active={true}
                startY={-5}
                targetY={0}
                scale={98}
                rotation={[0, Math.PI / 2 + 9, 0]}
                position={[-3.2, 0, 2.7]}
              />
            )}

            {activeIndex === 3 && (
              <FloatingModel
                url="/models/low-poly_buster_sword.glb"
                active={true}
                startY={-5}
                targetY={0}
                scale={38}
                rotation={[Math.PI / 1.5, -Math.PI / 4, 0]}
                position={[2.5, -3, -1.2]}
              />
            )}
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.1}
          />

          <EffectComposer>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Panel Content */}
      <AnimatePresence mode="wait">
        {panelsVisible && (
          <motion.div
            key={panels[activeIndex].id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0,0,0,0.2)",
            }}
          >
            {panels[activeIndex].id === "intro" && user ? (
              <UserProfilePanel user={fullUserProfile} />
            ) : (
              <SectionPanel
                id={panels[activeIndex].id}
                title={panels[activeIndex].title}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
