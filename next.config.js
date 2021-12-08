// @ts-check

/**
 * @type {import('next').NextConfig}
 * */

const { withPlaiceholder } = require("@plaiceholder/next");
const withTM = require("next-transpile-modules")(["rehype-parse"]); // pass the modules you would like to see transpiled

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: true,
  },
};

module.exports = withTM(withPlaiceholder({ nextConfig }));
