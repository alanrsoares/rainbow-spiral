import { handleResize, setupCanvas } from "./canvas";
import { setupInputListeners } from "./input";
import { Renderer } from "./renderer";
import { state, type VisualSettings } from "./state";
import { lerp } from "./utils";

declare global {
	interface Window {
		startApp: () => void;
		togglePlay: () => void;
		flip: () => void;
		getSettings: () => VisualSettings;
		updateSettings: (settings: Partial<VisualSettings>) => void;
	}
}

window.startApp = () => {
	const canvas = setupCanvas("canvas-container");
	if (!canvas) {
		console.error("Failed to set up canvas");
		return;
	}

	const container = document.getElementById("canvas-container");
	if (container) {
		handleResize(canvas, container);
	}

	setupInputListeners(canvas, state);

	let renderer: Renderer;
	try {
		renderer = new Renderer(canvas);
	} catch (e) {
		console.error(e);
		return;
	}

	function play(time: number) {
		// Smooth mouse movement
		// Factor 0.1 gives a nice weighty feel. Adjust higher for faster response.
		const smoothing = 0.05;
		state.mouse.x = lerp(state.mouse.x, state.targetMouse.x, smoothing);
		state.mouse.y = lerp(state.mouse.y, state.targetMouse.y, smoothing);

		if (state.playing) {
			renderer.draw(time, state);
		}
		window.requestAnimationFrame(play);
	}

	window.togglePlay = () => {
		state.playing = !state.playing;
	};

	window.flip = () => {
		state.reverse = !state.reverse;
	};

	window.getSettings = () => ({
		speed: state.speed,
		gridPeriod: state.gridPeriod,
		acidIntensity: state.acidIntensity,
		electricity: state.electricity,
		coreGlow: state.coreGlow,
		chromatic: state.chromatic,
		gamma: state.gamma,
		reverse: state.reverse,
	});

	window.updateSettings = (settings: Partial<VisualSettings>) => {
		Object.assign(state, settings);
	};

	window.requestAnimationFrame(play);
};
