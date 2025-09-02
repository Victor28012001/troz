import { Text } from "@react-three/drei";

export default function BackgroundText() {
  return (
    <Text
      position={[0, 0, -10]} // pushed back on Z axis
      fontSize={1.5}
      color="#444"
      anchorX="center"
      anchorY="middle"
    >
      WELCOME TO THE FUTURE
    </Text>
  );
}
