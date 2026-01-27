import { glslPlugin } from "./glsl-plugin";

async function build() {
	console.log("[build] starting...");

	await Bun.build({
		entrypoints: ["src/index.ts"],
		outdir: "dist",
		plugins: [glslPlugin],
	});

	console.log("[build] done 🎉");
}

build().catch(console.error);