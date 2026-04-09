import { enableTailwind } from "@remotion/tailwind-v4";

export const webpackOverride = (currentConfig) => {
  return enableTailwind(currentConfig);
};
