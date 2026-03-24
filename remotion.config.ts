// See all configuration options: https://remotion.dev/docs/config
import { Config } from "@remotion/cli/config";
import { webpackOverride } from "./src/remotion/webpack-override.mjs";

Config.setVideoImageFormat("jpeg");
Config.overrideWebpackConfig(webpackOverride);
