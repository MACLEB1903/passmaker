import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  outDir: "dist",
  clean: true,
  splitting: false,
  sourcemap: false,
  minify: false,
  target: "es2020",

  dts: {
    entry: "src/index.ts",
  },

  outExtension({ format }) {
    return { js: format === "esm" ? ".mjs" : ".cjs" };
  },
  cjsInterop: true,
});
