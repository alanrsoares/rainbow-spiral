export interface VisualSettings {
	speed: number;
	gridPeriod: number;
	acidIntensity: number;
	electricity: number;
	coreGlow: number;
	chromatic: number;
	gamma: number;
	reverse: boolean;
}

export interface State extends VisualSettings {
	playing: boolean;
	mouse: { x: number; y: number }; // Smoothed position used for rendering
	targetMouse: { x: number; y: number }; // Raw input target
}

export const defaultSettings: VisualSettings = {
	speed: 0.5,
	gridPeriod: 8.0,
	acidIntensity: 0.5,
	electricity: 2.0,
	coreGlow: 0.04,
	chromatic: 0.005,
	gamma: 1.1,
	reverse: false,
};

export const state: State = {
	...defaultSettings,
	playing: true,
	mouse: { x: 0, y: 0 },
	targetMouse: { x: 0, y: 0 },
};
