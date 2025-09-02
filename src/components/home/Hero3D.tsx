import { useState, useEffect, useCallback, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useUser } from "@civic/auth-web3/react";
import { CurvedAnimatedText } from "./CurvedAnimatedText";
import { Model } from "./Model";
import {
  EffectComposer,
  Bloom,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import * as THREE from "three";
// import BackgroundText from "./BackgroundText";

// 👇 Custom component to update the camera dynamically
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const isMobile = size.width < 768;
    camera.position.set(0, 2, isMobile ? 8 : 6);
    if ("fov" in camera) {
      (camera as THREE.PerspectiveCamera).fov = isMobile ? 60 : 50;
      camera.updateProjectionMatrix();
    }
  }, [camera, size]);

  return null;
}

export default function Hero3D() {
  const { signIn, user } = useUser();
  const doSignIn = useCallback(() => {
    signIn().catch(console.error);
  }, [signIn]);

  const [buttonWidth, setButtonWidth] = useState(getWidth());

  function getWidth() {
    const width = window.innerWidth;
    return width <= 1024 ? "80vw" : "20vw";
  }

  useEffect(() => {
    const handleResize = () => setButtonWidth(getWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-[70vh] relative">
      {/* 🔤 Static Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[24vw] font-electro font-extrabold text-[#fff] opacity-10 select-none">
          TOZ
        </h1>
      </div>

      <Canvas style={{ width: "100%", height: "100%" }} dpr={[1, 2]}>
        <directionalLight position={[5, 10, 5]} intensity={0.1} />

        <Suspense fallback={null}>
          <ResponsiveCamera /> {/* 👈 Dynamically update camera on resize */}
          <Model />
          <CurvedAnimatedText />
          {/* <BackgroundText /> */}
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} />

        {/* Glow Effect */}
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

      {!user && (
        <div className="absolute -bottom-[12px] left-1/2 transform -translate-x-1/2">
          <button
            onClick={doSignIn}
            style={{
              padding: "12px",
              width: buttonWidth,
              cursor: "pointer",
            }}
            className="text-white border border-gray-500 rounded-full"
          >
            Customize Your Character
          </button>
        </div>
      )}
    </div>
  );
}
