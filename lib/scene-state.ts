/** Normalised pointer, updated by a single passive DOM listener. */
export const scenePointer = { x: 0, y: 0 };

export type ActName =
  | "hero"
  | "artist"
  | "sound"
  | "signal"
  | "archive"
  | "live"
  | "booking";

export type SceneState = {
  camX: number;
  camY: number;
  camZ: number;
  lookX: number;
  lookY: number;
  discX: number;
  discY: number;
  discZ: number;
  scale: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  amp: number;
  speed: number;
  dim: number;
  boost: number;
};

/**
 * A single mutable object shared by GSAP and the R3F scene.
 * GSAP tweens these numbers; useFrame smooths the actual render values.
 * No React state is written per frame.
 */
export const scene: SceneState = {
  camX: 0,
  camY: 0.18,
  camZ: 7.4,
  lookX: 0.25,
  lookY: 0,
  discX: 1.7,
  discY: 0.05,
  discZ: 0,
  scale: 0.9,
  rotX: 0.22,
  rotY: -0.5,
  rotZ: -0.1,
  amp: 0.06,
  speed: 1,
  dim: 1,
  boost: 0,
};

export const actPresets: Record<ActName, Partial<SceneState>> = {
  hero: {
    camX: 0,
    camY: 0.18,
    camZ: 7.4,
    lookX: 0.25,
    lookY: 0,
    discX: 1.7,
    discY: 0.05,
    discZ: 0,
    scale: 1.52,
    rotX: 0.2,
    rotY: -0.42,
    rotZ: -0.08,
    amp: 0.075,
    speed: 1,
    dim: 1,
  },
  artist: {
    camX: -0.2,
    camY: 0.35,
    camZ: 8.7,
    lookX: -0.4,
    lookY: 0.1,
    discX: -2.7,
    discY: 1.1,
    discZ: -1.4,
    scale: 1,
    rotX: 0.4,
    rotY: 0.55,
    rotZ: 0.2,
    amp: 0.05,
    speed: 0.55,
    dim: 0.5,
  },
  sound: {
    camX: 0.2,
    camY: 0.1,
    camZ: 8,
    lookX: 0.7,
    lookY: -0.1,
    discX: 2.8,
    discY: -0.55,
    discZ: -0.6,
    scale: 1.2,
    rotX: 0.1,
    rotY: -0.85,
    rotZ: 0.15,
    amp: 0.13,
    speed: 1.2,
    dim: 0.72,
  },
  signal: {
    camX: 0,
    camY: 0.05,
    camZ: 6.6,
    lookX: 0,
    lookY: 0.05,
    discX: 0,
    discY: 0.15,
    discZ: -0.4,
    scale: 1.5,
    rotX: 0.05,
    rotY: -0.08,
    rotZ: 0.02,
    amp: 0.12,
    speed: 1.5,
    dim: 0.82,
  },
  archive: {
    camX: 0,
    camY: 0.2,
    camZ: 9.4,
    lookX: 0,
    lookY: 0,
    discX: 4.8,
    discY: -1.6,
    discZ: -2,
    scale: 0.7,
    rotX: 0.45,
    rotY: -1,
    rotZ: 0.3,
    amp: 0.03,
    speed: 0.4,
    dim: 0.22,
  },
  live: {
    camX: -0.15,
    camY: 0.2,
    camZ: 8.2,
    lookX: -0.6,
    lookY: 0.1,
    discX: -3.3,
    discY: 0.9,
    discZ: -1,
    scale: 1,
    rotX: 0.25,
    rotY: 0.8,
    rotZ: -0.2,
    amp: 0.06,
    speed: 0.7,
    dim: 0.45,
  },
  booking: {
    camX: 0,
    camY: 0.1,
    camZ: 8.8,
    lookX: 0.5,
    lookY: 0,
    discX: 3.5,
    discY: -0.7,
    discZ: -1.2,
    scale: 0.82,
    rotX: 0.18,
    rotY: -0.6,
    rotZ: 0.1,
    amp: 0.05,
    speed: 0.5,
    dim: 0.5,
  },
};
