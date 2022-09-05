// @ts-check

/**
 * @type {import('next').NextConfig}
 * */

const { withPlaiceholder } = require("@plaiceholder/next");
const { withContentlayer } = require("next-contentlayer");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
  withContentlayer(
    withPlaiceholder({
      images: {
        domains: [
          "images.unsplash.com",
          "avatars.githubusercontent.com",
          "code.visualstudio.com",
          "elshoff.s3-us-east-2.amazonaws.com",
        ],
      },
    })
  )
);
