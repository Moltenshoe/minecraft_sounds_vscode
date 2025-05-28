// esbuild.js
require("esbuild").build({
    entryPoints: ["index.js"], // change this to your main JS file
    bundle: true,
    outfile: "bundle.js",
  }).catch(() => process.exit(1));
  