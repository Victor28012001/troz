// components/CameraRig.tsx
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface CameraRigProps {
  activeIndex: number;
}

export const CameraRig = ({ activeIndex }: CameraRigProps) => {
  const { camera, size, gl } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const isMobile = size.width < 768;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- Handle OrbitControls interaction
  useEffect(() => {
    const controls = gl.domElement;

    const onStart = () => {
      setIsUserInteracting(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const onEnd = () => {
      timeoutRef.current = setTimeout(() => {
        setIsUserInteracting(false);
      }, 1500); // wait 1.5s after user stops rotating
    };

    controls.addEventListener("pointerdown", onStart);
    controls.addEventListener("pointerup", onEnd);
    controls.addEventListener("touchstart", onStart);
    controls.addEventListener("touchend", onEnd);

    return () => {
      controls.removeEventListener("pointerdown", onStart);
      controls.removeEventListener("pointerup", onEnd);
      controls.removeEventListener("touchstart", onStart);
      controls.removeEventListener("touchend", onEnd);
    };
  }, [gl.domElement]);

  // --- Update target position on activeIndex or screen size change
  useEffect(() => {
    switch (activeIndex) {
      case 2: // Lobby
        targetPosition.current.set(0, isMobile ? 5 : 6, isMobile ? 14 : 15);
        break;
      case 1: // Games (duel)
      case 3: // Games (duel)
      case 4: // Games (duel)
      case 5: // Games (duel)
        targetPosition.current.set(0, isMobile ? 6 : 7, isMobile ? 16 : 18);
        break;
      default:
        targetPosition.current.set(0, isMobile ? 2 : 2, isMobile ? 8 : 6);
        break;
    }

    // Update FOV based on screen size
    if ("fov" in camera) {
      (camera as THREE.PerspectiveCamera).fov = isMobile ? 60 : 50;
      camera.updateProjectionMatrix();
    }
  }, [activeIndex, isMobile, camera]);

  // --- Smooth camera movement
  useFrame(() => {
    if (!isUserInteracting) {
      camera.position.lerp(targetPosition.current, 0.05);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
};
