async function build() {

  return Bun.build({
    entrypoints: ["src/index.ts"],
    outdir: "dist",
    loader: {
      ".vert": "text",
      ".frag": "text",
    },
  });
}

build().catch(console.error).then(() => {
  console.log("[build] done 🎉");
});