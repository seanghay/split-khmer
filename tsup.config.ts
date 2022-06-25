import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  splitting: false,
  clean: true,
  sourcemap: true,
  format: ["cjs", "esm"],
  dts: true,
  minify: !options.watch,
}));
