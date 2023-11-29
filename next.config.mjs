// @ts-check

/**
 * @type {import('next').NextConfig}
 */

import withPlaiceholder from "@plaiceholder/next";
import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    // loaderFile: "./lib/cloudinary.ts",
    domains: [
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "code.visualstudio.com",
      "elshoff.s3-us-east-2.amazonaws.com",
    ],
  },
  /** @see https://github.com/contentlayerdev/contentlayer/issues/272 */
  webpack: (webpackConfig) => {
    return {
      ...webpackConfig,
      infrastructureLogging: {
        level: "error",
      },
    };
  },
};

export default withContentlayer(withPlaiceholder(config));
