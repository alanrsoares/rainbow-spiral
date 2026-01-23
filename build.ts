async function build() {
  console.log("[build] starting...");

  await Bun.build({
    entrypoints: ["src/index.ts"],
    outdir: "dist",
    loader: {
      ".vert": "text",
      ".frag": "text",
    },
  });

  console.log("[build] done 🎉");
}

build().catch(console.error)