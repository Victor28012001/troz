// import { AnimationMixer, Group, AnimationClip } from "three";
// import { useRef, useState, useEffect, useMemo } from "react";
// import { useFrame } from "@react-three/fiber";
// import { useAnimations, useGLTF, useFBX } from "@react-three/drei";
// import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

// interface ModelProps {
//   activeIndex: number;
// }

// export function Model({ activeIndex }: ModelProps) {
//   const modelRef = useRef<Group>(null);
//   const defaultCloneMixerRef = useRef<AnimationMixer | null>(null);

//   const { scene, animations: gltfAnimations } = useGLTF("/models/model1.glb");
//   const { animations: lobbyAnimations } = useFBX("/animations/lobby.fbx");
//   const { animations: chatAnimations } = useFBX("/animations/chat.fbx");
//   const { animations: assetAnimations } = useFBX("/animations/asset.fbx");
//   const { animations: characterAnimations } = useFBX(
//     "/animations/character.fbx"
//   );
//   const defaultMixerRef = useRef<AnimationMixer | null>(null);

//   const { actions } = useAnimations(gltfAnimations, modelRef);
//   if (actions.name) console.log("ok");
//   const [cloneRef] = useState(() => SkeletonUtils.clone(scene));

//   const [mixer, setMixer] = useState<AnimationMixer | null>(null);
//   const [cloneMixer, setCloneMixer] = useState<AnimationMixer | null>(null);

//   // ✅ Fix: Add explicit Record<number, ...> type
//   const poseMap: Record<number, { animations: AnimationClip[]; name: string }> =
//     useMemo(() => {
//       return {
//         1: { animations: characterAnimations, name: "Character" },
//         2: { animations: lobbyAnimations, name: "Lobby" },
//         3: { animations: assetAnimations, name: "Asset" },
//         4: { animations: chatAnimations, name: "Chat" },
//       };
//     }, [characterAnimations, lobbyAnimations, assetAnimations, chatAnimations]);

//   useEffect(() => {
//     if (!modelRef.current || defaultMixerRef.current) return;

//     const mixer = new AnimationMixer(scene);
//     const defaultAction = mixer.clipAction(gltfAnimations[0], modelRef.current);
//     defaultAction.play();
//     defaultAction.paused = true;
//     defaultAction.time = 0;
//     mixer.update(0);

//     defaultMixerRef.current = mixer;
//   }, [scene, gltfAnimations]);

//   useEffect(() => {
//     if (!cloneRef || defaultCloneMixerRef.current) return;

//     const mixer = new AnimationMixer(cloneRef);
//     const action = mixer.clipAction(gltfAnimations[0]);
//     action.play();
//     action.paused = true;
//     action.time = 0;
//     mixer.update(0);

//     defaultCloneMixerRef.current = mixer;
//   }, [cloneRef, gltfAnimations]);

//   useEffect(() => {
//     if (!modelRef.current) {
//       return;
//     }

//     mixer?.stopAllAction();
//     setMixer(null);

//     // If we're in index 0 or 5, use the default pose
//     if (activeIndex === 0 || activeIndex === 5) {
//       const defaultMixer = defaultMixerRef.current;
//       if (defaultMixer) {
//         defaultMixer.update(0);
//         return;
//       }
//     }

//     // Otherwise, pick the appropriate pose from poseMap
//     let selectedAnimations: AnimationClip[] = [];

//     if (poseMap[activeIndex]) {
//       selectedAnimations = poseMap[activeIndex].animations;
//     }

//     if (selectedAnimations.length === 0) {
//       return;
//     }

//     const newMixer = new AnimationMixer(scene);
//     const action = newMixer
//       .clipAction(selectedAnimations[0], modelRef.current)
//       .reset()
//       .play();
//     action.paused = true;
//     action.time = 0;
//     newMixer.update(0);

//     setMixer(newMixer);

//     return () => {
//       newMixer.stopAllAction();
//     };
//   }, [activeIndex, scene, poseMap]);

//   useEffect(() => {
//     cloneMixer?.stopAllAction();
//     setCloneMixer(null);

//     if (!cloneRef) return;

//     // Default pose for clone
//     if (activeIndex === 0 || activeIndex === 5) {
//       const defaultCloneMixer = defaultCloneMixerRef.current;
//       if (defaultCloneMixer) {
//         defaultCloneMixer.update(0);
//       }
//       return;
//     }

//     // Custom pose for clone (e.g., chat)
//     if (activeIndex === 4) {
//       const mixer = new AnimationMixer(cloneRef);
//       const action = mixer.clipAction(chatAnimations[0]).reset().play();
//       action.paused = true;
//       action.time = 0;
//       mixer.update(0);
//       setCloneMixer(mixer);
//       return () => {
//         mixer.stopAllAction();
//       };
//     }
//   }, [activeIndex, chatAnimations, cloneRef]);

//   useFrame((_state, delta) => {
//     mixer?.update(delta);
//     cloneMixer?.update(delta);
//   });

//   if (activeIndex === 2) {
//     return (
//       <primitive
//         ref={modelRef}
//         object={scene}
//         scale={6}
//         position={[0, -1.5, 1.5]}
//         rotation={[-Math.PI / 2, 0, 0]}
//       />
//     );
//   }

//   if (activeIndex === 1 || activeIndex === 3) {
//     return (
//       <primitive
//         ref={modelRef}
//         object={scene}
//         scale={6}
//         position={[0, -5, 0]}
//         rotation={[-Math.PI / 2, 0, 0]}
//       />
//     );
//   }

//   if (activeIndex === 4) {
//     return (
//       <group ref={modelRef}>
//         <primitive
//           ref={modelRef}
//           object={scene}
//           scale={6}
//           position={[0, 0, -3]}
//           rotation={[-Math.PI / 2, 0, 0]}
//         />
//         <primitive
//           object={cloneRef}
//           scale={6}
//           position={[0, 0, 3]}
//           rotation={[-Math.PI / 2, 0, Math.PI]}
//         />
//       </group>
//     );
//   }

//   if (activeIndex === 5) {
//     return (
//       <group ref={modelRef}>
//         <primitive
//           object={scene}
//           scale={6}
//           position={[-3, -7, -2]}
//           rotation={[0, 0, 0]}
//         />
//         <primitive
//           object={cloneRef}
//           scale={6}
//           position={[3, -7, 0]}
//           rotation={[0, Math.PI, 0]}
//         />
//       </group>
//     );
//   }

//   return (
//     <primitive
//       ref={modelRef}
//       object={scene}
//       scale={6}
//       position={[0, -7, 0]}
//       rotation={[0, 0, 0]}
//     />
//   );
// }
import { AnimationMixer, Group } from "three";
import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

interface ModelProps {
  activeIndex: number;
}

export function Model({ activeIndex }: ModelProps) {
  const modelRef = useRef<Group>(null);
  const defaultMixerRef = useRef<AnimationMixer | null>(null);
  const defaultCloneMixerRef = useRef<AnimationMixer | null>(null);

  const { scene, animations } = useGLTF("/models/model.glb");
  const [cloneRef] = useState(() => SkeletonUtils.clone(scene));

  const { actions } = useAnimations(animations, modelRef);
  const { actions: cloneActions } = useAnimations(animations, cloneRef);

  const [mixer, setMixer] = useState<AnimationMixer | null>(null);
  const [cloneMixer, setCloneMixer] = useState<AnimationMixer | null>(null);

  const poseMap: Record<number, string> = useMemo(() => {
    return {
      0: "Armature|mixamo.com|Layer0_Armature", // default pose
      1: "character",
      2: "lobby",
      3: "asset",
      4: "chat",
    };
  }, []);

  // ✅ Set up default mixer once for main model
  useEffect(() => {
    if (!modelRef.current || defaultMixerRef.current) return;

    const mixer = new AnimationMixer(scene);
    const defaultAction = mixer.clipAction(animations[0], modelRef.current);
    defaultAction.play();
    defaultAction.paused = true;
    defaultAction.time = 0;
    mixer.update(0);

    defaultMixerRef.current = mixer;
  }, [scene, animations]);

  // ✅ Set up default mixer once for clone
  useEffect(() => {
    if (!cloneRef || defaultCloneMixerRef.current) return;

    const mixer = new AnimationMixer(cloneRef);
    const defaultAction = mixer.clipAction(animations[0], cloneRef);
    defaultAction.play();
    defaultAction.paused = true;
    defaultAction.time = 0;
    mixer.update(0);

    defaultCloneMixerRef.current = mixer;
  }, [cloneRef, animations]);

  // ✅ Play animation on main model
  useEffect(() => {
    if (!modelRef.current || !actions) return;

    mixer?.stopAllAction();
    setMixer(null);

    const actionName = poseMap[activeIndex];

    if (!actionName || !actions[actionName]) {
      defaultMixerRef.current?.update(0);
      return;
    }

    const newMixer = new AnimationMixer(scene);
    const action = newMixer
      .clipAction(actions[actionName].getClip(), modelRef.current)
      .reset()
      .play();
    action.paused = true;
    action.time = 0;
    newMixer.update(0);

    setMixer(newMixer);

    return () => {
      newMixer.stopAllAction();
    };
  }, [activeIndex, actions, scene, poseMap]);

  // ✅ Play animation on clone
  useEffect(() => {
    if (!cloneRef || !cloneActions) return;

    cloneMixer?.stopAllAction();
    setCloneMixer(null);

    const actionName = poseMap[activeIndex];

    if (!actionName || !cloneActions[actionName]) {
      defaultCloneMixerRef.current?.update(0);
      return;
    }

    const mixer = new AnimationMixer(cloneRef);
    const action = mixer
      .clipAction(cloneActions[actionName].getClip(), cloneRef)
      .reset()
      .play();
    action.paused = true;
    action.time = 0;
    mixer.update(0);
    setCloneMixer(mixer);

    return () => {
      mixer.stopAllAction();
    };
  }, [activeIndex, cloneActions, cloneRef, poseMap]);

  useFrame((_state, delta) => {
    mixer?.update(delta);
    cloneMixer?.update(delta);
  });

  // ✅ Return different layouts depending on activeIndex
  if (activeIndex === 2) {
    return (
      <primitive
        ref={modelRef}
        object={scene}
        scale={6}
        position={[0, -6.2, 1]}
        rotation={[0, 0, 0]}
      />
    );
  }

  if (activeIndex === 1 || activeIndex === 3) {
    return (
      <primitive
        ref={modelRef}
        object={scene}
        scale={6}
        position={[0, -5, 0]}
        rotation={[0, 0, 0]}
      />
    );
  }

  if (activeIndex === 4) {
    return (
      <group>
        <primitive
          ref={modelRef}
          object={scene}
          scale={6}
          position={[0, -7, 10]}
          rotation={[-Math.PI / 3, 0, 0]}
        />
        <primitive
          object={cloneRef}
          scale={6}
          position={[0, -6, -15]}
          rotation={[Math.PI / 3, Math.PI, 0]}
        />
      </group>
    );
  }

  if (activeIndex === 5) {
    return (
      <group>
        <primitive
          object={scene}
          scale={6}
          position={[-3, -7, -2]}
          rotation={[0, 0, 0]}
        />
        <primitive
          object={cloneRef}
          scale={6}
          position={[3, -7, 0]}
          rotation={[0, Math.PI, 0]}
        />
      </group>
    );
  }

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={6}
      position={[0, -7, 0]}
      rotation={[0, 0, 0]}
    />
  );
}
