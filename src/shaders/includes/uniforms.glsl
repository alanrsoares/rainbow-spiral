// --- UNIFORMS ---
// Shared
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_speed;
uniform float u_coreGlow;
uniform float u_chromatic;
uniform float u_gamma;
uniform int u_shaderMode; // 0 = spiral, 1 = mandelbrot

// Spiral-specific
uniform float u_gridPeriod;
uniform float u_acidIntensity;
uniform float u_electricity;

// Mandelbrot-specific
uniform int u_maxIterations;
uniform vec2 u_zoomCenter;
uniform float u_colorCycles;
