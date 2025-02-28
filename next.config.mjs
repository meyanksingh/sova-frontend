import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let userConfig = undefined;
try {
  userConfig = await import('./v0-user-next.config.js').then((mod) => mod.default);
} catch (e) {
  console.warn("Warning: No user Next.js config found or failed to load.");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Disable these experimental Webpack features if causing issues
    webpackBuildWorker: false, 
    parallelServerBuildTraces: false, 
    parallelServerCompiles: false,
  },
  webpack: (config, { isServer }) => {
    console.log("⚡ Webpack Config Loaded");

    // Debug Webpack settings if needed
    if (process.env.DEBUG_WEBPACK) {
      console.log(JSON.stringify(config, null, 2));
    }

    return config; // No manual CSS modifications
  },
};

// Merge user-provided config if available
mergeConfig(nextConfig, userConfig);

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) return;

  for (const key in userConfig) {
    if (typeof nextConfig[key] === "object" && !Array.isArray(nextConfig[key])) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      };
    } else {
      nextConfig[key] = userConfig[key];
    }
  }
}

export default nextConfig;
