// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// require("react-native-childprocess");

config.resolver.extraNodeModules = require("node-libs-react-native");

module.exports = config;
