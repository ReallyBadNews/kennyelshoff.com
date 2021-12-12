const isCi = process.env.CI !== undefined;
if (!isCi) {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  require("husky").install();
}
