// @ts-check

/**
 * @type {import('next').NextConfig}
 * */

const { withPlaiceholder } = require("@plaiceholder/next");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPlaiceholder({ nextConfig });
