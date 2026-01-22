export interface State {
	speed: number;
	reverse: boolean;
	playing: boolean;
	mouse: { x: number; y: number }; // Normalized -1 to 1
}

export const state: State = {
	speed: 0.5,
	reverse: false,
	playing: true,
	mouse: { x: 0, y: 0 },
};
