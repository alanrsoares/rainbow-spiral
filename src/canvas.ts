/**
 * Get the size of the canvas
 * @returns The size of the canvas
 */
export function getCanvasSize(): [number, number] {
	const body = document.body;
	const keys = ["scroll", "offset", "client"] as const;

	const maxDimension = (dimension: string) =>
		Math.max(
			...keys
				.map((key) => key + dimension)
				.filter(
					(attribute) =>
						!!(body as unknown as Record<string, number>)[attribute],
				)
				.map(
					(attribute) => (body as unknown as Record<string, number>)[attribute],
				),
		);

	return [maxDimension("Height"), maxDimension("Width")];
}

/**
 * Setup the canvas
 * @param containerId - The id of the container
 * @returns The canvas element
 */
export function setupCanvas(containerId: string): HTMLCanvasElement | null {
	const container = document.getElementById(containerId);
	if (!container) return null;

	const canvas = document.createElement("canvas");
	canvas.id = "canvas";
	container.appendChild(canvas);

	// Initial size set
	const [h, w] = getCanvasSize();
	canvas.width = w;
	canvas.height = h;
	canvas.style.width = `${w}px`;
	canvas.style.height = `${h}px`;
	container.style.width = `${w}px`;
	container.style.height = `${h}px`;

	return canvas;
}

/**
 * Handle the resize of the canvas
 * @param canvas - The canvas element
 * @param container - The container element
 * @returns The resize function
 */
export function handleResize(
	canvas: HTMLCanvasElement,
	container: HTMLElement,
) {
	const resize = () => {
		const [h, w] = getCanvasSize();
		canvas.width = w;
		canvas.height = h;
		canvas.style.width = `${w}px`;
		canvas.style.height = `${h}px`;
		container.style.width = `${w}px`;
		container.style.height = `${h}px`;
	};
	window.addEventListener("resize", resize);
	return resize;
}
