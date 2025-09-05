// components/FloatingModel.tsx
import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingModelProps {
  url: string;
  active: boolean;
  startY?: number;
  targetY?: number;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function FloatingModel({
  url,
  active,
  startY = -5,
  targetY = 0,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: FloatingModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  // Initial offscreen position
  useEffect(() => {
    if (group.current) {
      group.current.position.set(position[0], startY, position[2]);
    }
  }, [startY, position]);

  // Animate upward when active
  useFrame((_, delta) => {
    if (active && group.current) {
      const target = new THREE.Vector3(position[0], targetY, position[2]);
      group.current.position.lerp(target, 1 - Math.pow(0.001, delta));
    }
  });

  return (
    <group ref={group} scale={scale} rotation={rotation} position={position}>
      <primitive object={scene} />
    </group>
  );
}
