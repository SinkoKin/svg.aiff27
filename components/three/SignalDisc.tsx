"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scene, scenePointer } from "@/lib/scene-state";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uBoost;
  uniform vec2 uPointer;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vH;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float height(vec2 p) {
    float r = length(p);
    float edge = smoothstep(1.0, 0.64, r);
    float cap = smoothstep(0.14, 0.32, r);
    float t = uTime;

    float ripple = sin(r * 19.0 - t * 1.15) * 0.55;
    ripple += sin(p.x * 6.0 + t * 0.7 + p.y * 2.2) * 0.3;
    ripple += sin(p.y * 9.0 - t * 0.85) * 0.2;
    ripple += noise(p * 3.2 + vec2(0.0, t * 0.08)) * 0.45;

    vec2 pointer = uPointer * 0.72;
    float d = distance(p, pointer);
    ripple += sin(d * 24.0 - t * 3.0) * exp(-d * 3.2) * 0.4;

    return ripple * uAmp * (1.0 + uBoost * 1.9) * edge * cap;
  }

  void main() {
    vUv = uv;
    vec2 p = uv * 2.0 - 1.0;

    float h0 = height(p);
    float e = 0.007;
    float hx = height(p + vec2(e, 0.0));
    float hy = height(p + vec2(0.0, e));
    vec3 n = normalize(vec3(-(hx - h0) / e, -(hy - h0) / e, 1.0));

    vH = h0;
    vec3 pos = vec3(p.x * 1.15, p.y * 1.15, h0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vView = -mv.xyz;
    vNormal = normalize(normalMatrix * n);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uDim;
  uniform vec3 uLime;
  uniform vec3 uEmber;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vH;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    float r = length(vUv * 2.0 - 1.0);
    if (r > 1.0) discard;

    vec3 N = normalize(vNormal);
    vec3 V = normalize(vView);

    float facing = clamp(dot(N, V), 0.0, 1.0);
    float fresnel = pow(1.0 - facing, 3.0);

    float up = N.y * 0.5 + 0.5;
    vec3 env = mix(
      vec3(0.006, 0.006, 0.007),
      vec3(0.22, 0.23, 0.215),
      smoothstep(0.08, 0.95, up)
    );

    vec3 L1 = normalize(vec3(-0.55, 0.65, 0.7));
    vec3 L2 = normalize(vec3(0.75, -0.35, 0.55));
    float s1 = pow(max(dot(reflect(-L1, N), V), 0.0), 46.0);
    float s2 = pow(max(dot(reflect(-L2, N), V), 0.0), 17.0);

    vec3 col = env;
    col += s1 * uLime * 1.15;
    col += s2 * uEmber * 0.38;
    col += fresnel * uLime * 0.5;

    float groove = sin(r * 118.0 + vH * 26.0);
    col *= 1.0 + groove * 0.034 * smoothstep(0.18, 0.55, r);

    float cap = smoothstep(0.19, 0.165, r);
    col = mix(col, vec3(0.012, 0.013, 0.011), cap);
    float capRing = smoothstep(0.007, 0.0, abs(r - 0.19));
    col += capRing * uLime * 0.35;

    float rim = smoothstep(0.955, 1.0, r);
    col = mix(col, uLime * 1.3, rim * 0.8);

    float grain = hash21(vUv * vec2(1700.0, 1700.0) + uTime * 0.7);
    col += grain * 0.07 - 0.035;

    col *= uDim;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function SignalDisc({
  reduced,
  segments,
}: {
  reduced: boolean;
  segments: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const time = useRef(0);
  const amp = useRef(scene.amp);
  const dim = useRef(1);
  const boost = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: scene.amp },
      uBoost: { value: 0 },
      uDim: { value: 1 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uLime: { value: new THREE.Vector3(0.851, 1.0, 0.247) },
      uEmber: { value: new THREE.Vector3(1.0, 0.294, 0.133) },
    }),
    [],
  );

  useFrame((_state, delta) => {
    const mat = materialRef.current;
    if (!mat) return;

    if (!reduced) {
      time.current += delta * scene.speed;
      amp.current += (scene.amp - amp.current) * Math.min(1, delta * 3.2);
      dim.current += (scene.dim - dim.current) * Math.min(1, delta * 2.4);
      boost.current += (scene.boost - boost.current) * Math.min(1, delta * 3.6);
    } else {
      amp.current = scene.amp;
      dim.current = scene.dim;
      boost.current = scene.boost;
    }

    mat.uniforms.uTime.value = reduced ? 0 : time.current;
    mat.uniforms.uAmp.value = amp.current;
    mat.uniforms.uDim.value = dim.current;
    mat.uniforms.uBoost.value = boost.current;
    mat.uniforms.uPointer.value.set(scenePointer.x, scenePointer.y);
  });

  return (
    <group>
      <mesh>
        <planeGeometry args={[2.3, 2.3, segments, segments]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 0, 0.025]}>
        <torusGeometry args={[1.155, 0.004, 6, 240]} />
        <meshBasicMaterial
          color="#d9ff3f"
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 0, -0.06]}>
        <torusGeometry args={[1.32, 0.0025, 4, 240]} />
        <meshBasicMaterial
          color="#f2eee3"
          transparent
          opacity={0.16}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
