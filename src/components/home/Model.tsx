import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group } from "three";

export function Model() {
  const modelRef = useRef<Group>(null);
  const { scene, animations } = useGLTF("/models/model.glb");
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (actions && animations.length > 0) {
      const pose = actions[animations[0].name];
      if (pose) {
        pose.play(); 
        pose.paused = true;
        pose.time = 0;
      }
    }
  }, [actions, animations]);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={6}
      position={[0, -7, 0]}
    />
  );
}
