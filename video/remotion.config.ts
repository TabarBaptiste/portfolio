import { Config } from "@remotion/cli/config";

// Réutilise les assets du site (polices, captures, icônes) sans les dupliquer
Config.setPublicDir("../public");
Config.setEntryPoint("src/index.ts");
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
