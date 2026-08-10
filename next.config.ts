import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root explicitly: an unrelated package-lock.json in
  // the parent (home) directory would otherwise make Turbopack guess the
  // wrong project root.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
