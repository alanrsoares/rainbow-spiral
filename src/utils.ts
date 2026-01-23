/**
 * Identity template tag for GLSL syntax highlighting.
 * Usage: glsl`void main() { ... }`
 */
export const glsl = (strings: TemplateStringsArray, ...values: unknown[]) => {
	let str = "";
	strings.forEach((string, i) => {
		str += string + (values[i] || "");
	});
	return str;
};

/**
 * Linear interpolation between two values.
 * @param start - The start value.
 * @param end - The end value.
 * @param t - The interpolation factor.
 * @returns The interpolated value.
 */
export function lerp(start: number, end: number, t: number) {
	return start * (1 - t) + end * t;
}
