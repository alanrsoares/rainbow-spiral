import * as twgl from "twgl.js";
import fsSource from "./shaders/shader.frag";
import vsSource from "./shaders/shader.vert";
import type { State } from "./state";

export class Renderer {
	gl: WebGLRenderingContext;
	programInfo: twgl.ProgramInfo;
	bufferInfo: twgl.BufferInfo;

	constructor(canvas: HTMLCanvasElement) {
		const gl = canvas.getContext("webgl");
		if (!gl) {
			throw new Error("WebGL not supported");
		}
		this.gl = gl;

		this.programInfo = twgl.createProgramInfo(gl, [vsSource, fsSource]);

		const arrays = {
			position: {
				numComponents: 2,
				data: [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1],
			},
		};
		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
	}

	draw(time: number, state: State) {
		const gl = this.gl;
		twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		const uniforms = {
			// Shared
			u_resolution: [gl.canvas.width, gl.canvas.height],
			u_time: time * 0.001,
			u_mouse: [state.mouse.x, state.mouse.y],
			u_speed: state.reverse ? -state.speed : state.speed,
			u_coreGlow: state.coreGlow,
			u_chromatic: state.chromatic,
			u_gamma: state.gamma,
			u_shaderMode: state.shaderMode === "mandelbrot" ? 1 : 0,
			// Spiral-specific
			u_gridPeriod: state.gridPeriod,
			u_acidIntensity: state.acidIntensity,
			u_electricity: state.electricity,
			// Mandelbrot-specific
			u_maxIterations: state.maxIterations,
			u_zoomCenter: [state.zoomCenterX, state.zoomCenterY],
			u_colorCycles: state.colorCycles,
		};

		gl.useProgram(this.programInfo.program);
		twgl.setBuffersAndAttributes(gl, this.programInfo, this.bufferInfo);
		twgl.setUniforms(this.programInfo, uniforms);

		twgl.drawBufferInfo(gl, this.bufferInfo);
	}
}
