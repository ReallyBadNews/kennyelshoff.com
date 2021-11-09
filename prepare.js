const isCi = process.env.CI !== undefined;
if (!isCi) {
  // eslint-disable-next-line global-require
  require("husky").install();
}
