"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import WebGLBoundary from "./WebGLBoundary";
import WebGLFallback from "./WebGLFallback";
import { scenePointer } from "@/lib/scene-state";
import { useReducedMotion } from "@/lib/use-motion";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl) return false;
    const extension = (gl as WebGLRenderingContext).getExtension(
      "WEBGL_lose_context",
    );
    extension?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function ExperienceCanvas() {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [failed, setFailed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Browser capability detection can only happen after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(supportsWebGL());
    setMobile(window.matchMedia("(max-width: 900px)").matches);

    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      scenePointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      scenePointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const showFallback = supported === false || failed;

  return (
    <div
      className={`scene${ready ? " is-ready" : ""}${
        reduced ? " is-reduced" : ""
      }${failed ? " is-failed" : ""}`}
      aria-hidden="true"
    >
      <WebGLFallback label={showFallback} />

      {supported && !failed ? (
        <div className="scene__canvas">
          <WebGLBoundary
            onError={() => {
              setFailed(true);
              setReady(false);
            }}
          >
            <Canvas
              dpr={[1, mobile ? 1.35 : 1.7]}
              camera={{ position: [0, 0.2, 7.6], fov: 38, near: 0.1, far: 40 }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
              }}
              frameloop={reduced ? "demand" : "always"}
              onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0);
                setReady(true);
              }}
            >
              <Suspense fallback={null}>
                <Scene mobile={mobile} reduced={reduced} />
              </Suspense>
            </Canvas>
          </WebGLBoundary>
        </div>
      ) : null}
    </div>
  );
}
