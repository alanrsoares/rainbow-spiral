export interface State {
	speed: number;
	reverse: boolean;
	playing: boolean;
	mouse: { x: number; y: number }; // Smoothed position used for rendering
	targetMouse: { x: number; y: number }; // Raw input target
}

export const state: State = {
	speed: 0.5,
	reverse: false,
	playing: true,
	mouse: { x: 0, y: 0 },
	targetMouse: { x: 0, y: 0 },
};
