import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  devIndicators: false,
  // Multiple lockfiles exist above this folder; pin Turbopack to this project.
  turbopack: { root: projectRoot },
};

export default nextConfig;
