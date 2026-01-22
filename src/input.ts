import type { State } from "./state";

/**
 * Setup input listeners for the canvas
 * @param canvas - The canvas element
 * @param state - The state of the application
 */
export function setupInputListeners(canvas: HTMLCanvasElement, state: State) {
	function updateMouse(x: number, y: number) {
		// Update target, not the current mouse state directly
		state.targetMouse.x = (x / canvas.width) * 2 - 1;
		state.targetMouse.y = -((y / canvas.height) * 2 - 1);
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
