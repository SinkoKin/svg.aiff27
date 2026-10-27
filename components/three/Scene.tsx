"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scene, scenePointer } from "@/lib/scene-state";
import SignalDisc from "./SignalDisc";
import Particles from "./Particles";

export default function Scene({
  mobile,
  reduced,
}: {
  mobile: boolean;
  reduced: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const setDpr = useThree((state) => state.setDpr);
  const perf = useRef({ frames: 0, sum: 0, done: false });

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const { camera } = state;

    const t = state.clock.elapsedTime;
    const px = reduced ? 0 : scenePointer.x;
    const py = reduced ? 0 : scenePointer.y;
    const mobileZ = mobile ? 1.35 : 0;
    const mobileY = mobile ? 0.4 : 0;

    const ease = reduced ? 1 : Math.min(1, delta * 2.6);

    camera.position.x += (scene.camX + px * 0.22 - camera.position.x) * ease;
    camera.position.y +=
      (scene.camY + mobileY + py * 0.16 - camera.position.y) * ease;
    camera.position.z += (scene.camZ + mobileZ - camera.position.z) * ease;
    camera.lookAt(
      scene.lookX + px * 0.1,
      scene.lookY + py * 0.06,
      0,
    );

    const targetX = mobile ? scene.discX * 0.3 : scene.discX;
    const floatY = reduced ? 0 : Math.sin(t * 0.32) * 0.035;

    group.position.x += (targetX - group.position.x) * ease;
    group.position.y +=
      (scene.discY + (mobile ? 0.55 : 0) + floatY - group.position.y) * ease;
    group.position.z += (scene.discZ - group.position.z) * ease;

    group.rotation.x +=
      (scene.rotX + (reduced ? 0 : Math.sin(t * 0.21) * 0.025) - group.rotation.x) *
      ease;
    group.rotation.y +=
      (scene.rotY + (reduced ? 0 : Math.cos(t * 0.17) * 0.035) - group.rotation.y) *
      ease;
    group.rotation.z +=
      (scene.rotZ + (reduced ? 0 : Math.sin(t * 0.1) * 0.015) - group.rotation.z) *
      ease;

    const s = scene.scale * (mobile ? 0.6 : 1);
    group.scale.x += (s - group.scale.x) * ease;
    group.scale.y = group.scale.x;
    group.scale.z = group.scale.x;

    if (!perf.current.done) {
      perf.current.frames += 1;
      perf.current.sum += delta;
      if (perf.current.frames === 100) {
        const avg = perf.current.sum / perf.current.frames;
        if (avg > 0.028) setDpr(1);
        perf.current.done = true;
      }
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <SignalDisc reduced={reduced} segments={mobile ? 96 : 200} />
      </group>
      <Particles count={mobile ? 170 : 620} reduced={reduced} />
    </>
  );
}
