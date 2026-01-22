import * as twgl from "twgl.js";
import { fsSource } from "./shaders/fragment";
import { vsSource } from "./shaders/vertex";
import type { State } from "./state";

/**
 * Renderer class
 * @param canvas - The canvas element
 */
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

	/**
	 * Draw the scene
	 * @param time - The time in milliseconds
	 * @param state - The state of the application
	 */
	draw(time: number, state: State) {
		const gl = this.gl;
		twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		const uniforms = {
			u_resolution: [gl.canvas.width, gl.canvas.height],
			u_time: time * 0.001,
			u_mouse: [state.mouse.x, state.mouse.y],
			u_speed: state.reverse ? -state.speed : state.speed,
		};

		gl.useProgram(this.programInfo.program);
		twgl.setBuffersAndAttributes(gl, this.programInfo, this.bufferInfo);
		twgl.setUniforms(this.programInfo, uniforms);

		twgl.drawBufferInfo(gl, this.bufferInfo);
	}
}
