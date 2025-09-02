import { useRef, useState, useEffect, memo } from "react";
import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const japaneseText = "ここは設計と開発がリアルタイムで出会う場所です";
const englishText = "Design and dev happens in real time.";
const RADIUS = 3;
const SWITCH_INTERVAL = 4000; // milliseconds

export const CurvedAnimatedText = memo(() => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [isJapanese, setIsJapanese] = useState(true);

  // Rotate the group slowly
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0025;
    }
  });

  // Toggle language every SWITCH_INTERVAL milliseconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsJapanese((prev) => !prev);
    }, SWITCH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Select current text and split into chars
  const currentText = isJapanese ? japaneseText : englishText;
  const displayedChars = currentText.split("");

  const glowMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#ff2d55"),
    emissive: new THREE.Color("#ff2d55"),
    emissiveIntensity: 20,
    toneMapped: false,
    side: THREE.DoubleSide,
  });

  return (
    <group ref={groupRef}>
      {displayedChars.map((char, i) => {
        // Spread chars evenly based on current text length
        const angle = (i / displayedChars.length) * Math.PI * 2;
        const x = Math.cos(angle) * RADIUS;
        const z = Math.sin(angle) * RADIUS;

        const position = new THREE.Vector3(x, 0.1, z);

        const lookAtVec = new THREE.Vector3();
        lookAtVec.copy(camera.position);
        lookAtVec.y = position.y; // keep same height
        lookAtVec.sub(position).normalize();

        const rotationY = Math.atan2(lookAtVec.x, lookAtVec.z);

        return (
          <Text
            key={i}
            position={position.toArray()}
            rotation={[0, rotationY, 0]}
            fontSize={0.2}
            anchorX="center"
            anchorY="middle"
            material={glowMaterial}
          >
            {char}
          </Text>
        );
      })}
    </group>
  );
});
