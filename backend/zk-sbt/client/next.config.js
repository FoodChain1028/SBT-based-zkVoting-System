// next.config.js
require("dotenv-flow").config({
  path: ".config",
  node_env: process.env.APP_ENV || process.env.NODE_ENV || "development",
});

const env = {};
Object.keys(process.env).forEach((key) => {
  if (key.startsWith("NEXT_PUBLIC_")) {
    env[key] = process.env[key];
  }
});

module.exports = {
  env,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};