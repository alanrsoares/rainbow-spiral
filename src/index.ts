import { setupCanvas, handleResize } from "./canvas";
import { setupInputListeners } from "./input";
import { Renderer } from "./renderer";
import { state } from "./state";

declare global {
	interface Window {
		startApp: () => void;
		togglePlay: () => void;
		flip: () => void;
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

	window.requestAnimationFrame(play);
};
