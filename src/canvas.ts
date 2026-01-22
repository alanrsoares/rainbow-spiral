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
