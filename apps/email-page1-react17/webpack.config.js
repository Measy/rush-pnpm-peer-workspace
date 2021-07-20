const path = require("path");
const fs = require("fs-extra");
const { merge } = require("webpack-merge");
const base = require("webpack5base");

const localCfg = {};
if (process.env.NODE_ENV === "development") {
} else {
  fs.removeSync("./output");
}

module.exports = merge(base, localCfg);
