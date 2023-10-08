// @ts-check

/**
 * @type {import('next').NextConfig}
 * */

const { withPlaiceholder } = require("@plaiceholder/next");
const { withContentlayer } = require("next-contentlayer");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // loaderFile: "./lib/cloudinary.ts",
    domains: [
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "code.visualstudio.com",
      "elshoff.s3-us-east-2.amazonaws.com",
    ],
  },
};

module.exports = withBundleAnalyzer(withContentlayer(withPlaiceholder(config)));
