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
      experimental: {
        legacyBrowsers: false,
        browsersListForSwc: true,
      },
      images: {
        domains: [
          "images.unsplash.com",
          "avatars.githubusercontent.com",
          "code.visualstudio.com",
        ],
      },
    })
  )
);
