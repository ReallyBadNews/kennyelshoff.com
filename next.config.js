// @ts-check

/**
 * @type {import('next').NextConfig}
 * */

const { withPlaiceholder } = require("@plaiceholder/next");
const withPlugins = require("next-compose-plugins");
const withContentlayer = require("next-contentlayer");

const plugins = [withPlaiceholder, withContentlayer];
const nextConfiguration = {
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = withPlugins([...plugins], nextConfiguration);
