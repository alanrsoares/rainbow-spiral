import type { State } from "./state";

export function setupInputListeners(canvas: HTMLCanvasElement, state: State) {
	function updateMouse(x: number, y: number) {
		state.mouse.x = (x / canvas.width) * 2 - 1;
		state.mouse.y = -((y / canvas.height) * 2 - 1);
	}

	window.addEventListener("mousemove", (e) =>
		updateMouse(e.clientX, e.clientY),
	);
	window.addEventListener(
		"touchmove",
		(e) => {
			e.preventDefault();
			const touch = e.touches[0];
			updateMouse(touch.clientX, touch.clientY);
		},
		{ passive: false },
	);
}
