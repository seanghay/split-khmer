import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  splitting: false,
  clean: true,
  sourcemap: false,
  format: ["cjs", "esm"],
  dts: true,
  minify: !options.watch,
}));
