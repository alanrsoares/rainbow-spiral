import type { BunPlugin } from "bun";
import { dirname, join } from "node:path";

/**
 * Resolves #include "filename" directives in GLSL files
 * Supports nested includes with circular dependency detection
 */
function resolveIncludes(
	source: string,
	filePath: string,
	visited = new Set<string>(),
): string {
	if (visited.has(filePath)) {
		throw new Error(`Circular include detected: ${filePath}`);
	}
	visited.add(filePath);

	const includeRegex = /^[ \t]*#include\s+"([^"]+)"/gm;
	const dir = dirname(filePath);

	return source.replace(includeRegex, (_, includePath) => {
		const fullPath = join(dir, includePath);
		const file = Bun.file(fullPath);

		// Read synchronously for simplicity in the transform
		const includeSource = require("fs").readFileSync(fullPath, "utf-8");

		// Recursively resolve nested includes
		return resolveIncludes(includeSource, fullPath, new Set(visited));
	});
}

export const glslPlugin: BunPlugin = {
	name: "glsl-loader",
	setup(build) {
		build.onLoad({ filter: /\.(frag|vert|glsl)$/ }, async (args) => {
			const source = await Bun.file(args.path).text();
			const processed = resolveIncludes(source, args.path);

			return {
				contents: `export default ${JSON.stringify(processed)};`,
				loader: "js",
			};
		});
	},
};
