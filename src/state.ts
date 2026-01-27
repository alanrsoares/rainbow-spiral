export type ShaderMode = "spiral" | "mandelbrot";

// Settings shared by all shader modes
export interface SharedSettings {
	speed: number;
	coreGlow: number;
	chromatic: number;
	gamma: number;
	reverse: boolean;
	shaderMode: ShaderMode;
}

// Spiral-specific settings
export interface SpiralSettings {
	gridPeriod: number;
	acidIntensity: number;
	electricity: number;
}

// Mandelbrot-specific settings
export interface MandelbrotSettings {
	maxIterations: number;
	zoomCenterX: number;
	zoomCenterY: number;
	colorCycles: number;
}

export interface VisualSettings
	extends SharedSettings,
		SpiralSettings,
		MandelbrotSettings {}

export interface State extends VisualSettings {
	playing: boolean;
	mouse: { x: number; y: number }; // Smoothed position used for rendering
	targetMouse: { x: number; y: number }; // Raw input target
}

export const defaultSharedSettings: SharedSettings = {
	speed: 0.5,
	coreGlow: 0.04,
	chromatic: 0.005,
	gamma: 1.1,
	reverse: false,
	shaderMode: "spiral",
};

export const defaultSpiralSettings: SpiralSettings = {
	gridPeriod: 8.0,
	acidIntensity: 0.5,
	electricity: 2.0,
};

export const defaultMandelbrotSettings: MandelbrotSettings = {
	maxIterations: 256,
	zoomCenterX: -0.745,
	zoomCenterY: 0.186,
	colorCycles: 1.0,
};

export const defaultSettings: VisualSettings = {
	...defaultSharedSettings,
	...defaultSpiralSettings,
	...defaultMandelbrotSettings,
};

export const state: State = {
	...defaultSettings,
	playing: true,
	mouse: { x: 0, y: 0 },
	targetMouse: { x: 0, y: 0 },
};
