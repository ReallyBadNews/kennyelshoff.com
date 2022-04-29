// @ts-check

/**
 * @type {import('next').NextConfig}
 * */

const { withPlaiceholder } = require("@plaiceholder/next");
const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer(
  withPlaiceholder({ images: { domains: ["images.unsplash.com"] } })
);
