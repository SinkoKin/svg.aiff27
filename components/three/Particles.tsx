"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  attribute float aSize;
  varying float vAlpha;
  varying float vTint;

  void main() {
    vec3 p = position;
    float t = uTime;
    p.y += sin(t * 0.12 + aSeed * 6.283) * 0.18;
    p.x += cos(t * 0.09 + aSeed * 4.0) * 0.12;
    p.z += sin(t * 0.07 + aSeed * 2.0) * 0.1;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * uPixelRatio * (16.0 / max(0.2, -mv.z));
    gl_Position = projectionMatrix * mv;

    vAlpha = smoothstep(-6.0, 1.0, p.z) * (0.3 + 0.7 * aSeed);
    vTint = step(0.86, aSeed);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uDim;
  varying float vAlpha;
  varying float vTint;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * vAlpha * uDim * 0.7;
    vec3 col = mix(vec3(0.82, 0.8, 0.74), vec3(0.851, 1.0, 0.247), vTint);
    gl_FragColor = vec4(col, a);
  }
`;

/* Deterministic PRNG keeps the starfield stable across renders and remounts. */
function mulberry32(seed: number) {
  let value = seed;
  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Particles({
  count,
  reduced,
}: {
  count: number;
  reduced: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, seeds, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const size = new Float32Array(count);
    const random = mulberry32(0x517e2a);
    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = (random() - 0.5) * 13;
      pos[i * 3 + 1] = (random() - 0.5) * 7.5;
      pos[i * 3 + 2] = (random() - 0.62) * 7;
      seed[i] = random();
      size[i] = 0.5 + random() * 1.9;
    }
    return { positions: pos, seeds: seed, sizes: size };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: {
        value:
          typeof window === "undefined"
            ? 1.5
            : Math.min(window.devicePixelRatio || 1, 1.6),
      },
      uDim: { value: 1 },
    }),
    [],
  );

  useFrame((_state, delta) => {
    if (materialRef.current && !reduced) {
      materialRef.current.uniforms.uTime.value += delta;
    }
    if (groupRef.current && !reduced) {
      groupRef.current.rotation.z += delta * 0.006;
      groupRef.current.rotation.y += delta * 0.004;
    }
  });

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}
