import * as twgl from "twgl.js";

declare global {
	interface Window {
		startApp: () => void;
		togglePlay: () => void;
		flip: () => void;
	}
}

interface State {
	speed: number;
	reverse: boolean;
	playing: boolean;
	mouse: { x: number; y: number }; // Normalized -1 to 1
}

window.startApp = () => {
	const state: State = {
		speed: 0.5,
		reverse: false,
		playing: true,
		mouse: { x: 0, y: 0 },
	};

	function getCanvasSize(): [number, number] {
		const body = document.body;
		const keys = ["scroll", "offset", "client"] as const;

		const maxDimension = (dimension: string) =>
			Math.max(
				...keys
					.map((key) => key + dimension)
					.filter(
						(attribute) =>
							!!(body as unknown as Record<string, number>)[attribute],
					)
					.map(
						(attribute) =>
							(body as unknown as Record<string, number>)[attribute],
					),
			);

		return [maxDimension("Height"), maxDimension("Width")];
	}

	function makeCanvas([height, width]: [number, number]) {
		const canvas = document.createElement("canvas");
		canvas.id = "canvas";
		canvas.width = width;
		canvas.height = height;
		return canvas;
	}

	const canvas = makeCanvas(getCanvasSize());
	const container = document.getElementById("canvas-container");
	if (!container) return;

	container.appendChild(canvas);

	function resize() {
		const [h, w] = getCanvasSize();
		canvas.width = w;
		canvas.height = h;
		canvas.style.width = `${w}px`;
		canvas.style.height = `${h}px`;
		container!.style.width = `${w}px`;
		container!.style.height = `${h}px`;
	}
	window.addEventListener("resize", resize);
	resize();

	function updateMouse(x: number, y: number) {
		state.mouse.x = (x / canvas.width) * 2 - 1;
		state.mouse.y = -((y / canvas.height) * 2 - 1);
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

	const gl = canvas.getContext("webgl");
	if (!gl) {
		console.error("WebGL not supported");
		return;
	}

	const vsSource = `
    attribute vec4 position;
    void main() {
      gl_Position = position;
    }
  `;

  // Seamless Acid Tunnel
	const fsSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_speed;

    vec3 palette(float t) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.263, 0.416, 0.557); 
      return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - u_resolution.xy * 0.5) / min(u_resolution.x, u_resolution.y);
      uv -= u_mouse * 0.3;

      vec3 finalColor = vec3(0.0);
      
      vec2 offsets[3];
      offsets[0] = vec2(0.0, 0.0);       
      offsets[1] = vec2(0.003, 0.003);   
      offsets[2] = vec2(-0.003, -0.003); 

      for (int i = 0; i < 3; i++) {
        vec2 p = uv + offsets[i] * (1.0 + length(uv) * 2.0);

        float r = length(p);
        float a = atan(p.y, p.x); // Returns -PI to PI

        // FIX: Ensure distortion is periodic
        // Use sine of the angle itself, or multiply angle by integer
        float distortion = sin(r * 8.0 - u_time * 1.5);
        a += distortion * 0.2;

        float z = 1.0 / r + u_time * u_speed;
        
        // --- SEAMLESS PATTERN LOGIC ---
        // Instead of mapping to 0-1 and guessing, we use the angle directly.
        // a is -PI to PI.
        // sin(a * N) is perfect if N is integer.
        
        float pattern = 0.0;
        
        // Layer 1: Base flow (Spiral arms)
        // 4.0 arms. Adding z creates the spiral twist.
        pattern += sin(a * 4.0 + z * 2.0 + u_time) * 1.0;
        
        // Layer 2: Rings/Ripples down the tunnel
        pattern += sin(z * 4.0 - u_time * 0.5) * 1.0;
        
        // Layer 3: Interference
        pattern += sin(a * 10.0 + z * 10.0 + u_time * 3.0) * 0.5;

        // Electric Lines
        // Use 'a' directly for angular component
        // 6.0 must be integer to match seamlessly at PI/-PI
        float electricity = 0.02 / abs(sin(z * 10.0 + a * 6.0 + u_time * 4.0));
        
        vec3 col = palette(pattern * 0.2 + z * 0.1 + u_time * 0.2);
        
        col += vec3(electricity) * vec3(0.6, 0.8, 1.0);

        float fog = smoothstep(0.0, 0.6, r);
        col *= fog;

        float coreGlow = 0.05 / (r + 0.05);
        col += vec3(coreGlow) * palette(u_time);

        if (i == 0) finalColor.r = col.r;
        if (i == 1) finalColor.g = col.g;
        if (i == 2) finalColor.b = col.b;
      }
      
      finalColor = pow(finalColor, vec3(1.2));

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

	const programInfo = twgl.createProgramInfo(gl, [vsSource, fsSource]);

	const arrays = {
		position: {
			numComponents: 2,
			data: [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1],
		},
	};
	const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

	function draw(time: number) {
		if (!gl) return;

		twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		const uniforms = {
			u_resolution: [gl.canvas.width, gl.canvas.height],
			u_time: time * 0.001,
			u_mouse: [state.mouse.x, state.mouse.y],
			u_speed: state.reverse ? -state.speed : state.speed,
		};

		gl.useProgram(programInfo.program);
		twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
		twgl.setUniforms(programInfo, uniforms);

		twgl.drawBufferInfo(gl, bufferInfo);
	}

	function play(time: number) {
		if (state.playing) {
			draw(time);
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