import * as twgl from "twgl.js";

declare global {
  interface Window {
    startApp: () => void;
    togglePlay: () => void;
    flip: () => void;
  }
}

interface State {
  skew: number;
  step: number;
  frame: number | null;
  color: number[];
  reverse: boolean;
  playing: boolean;
}

window.startApp = () => {
  const state: State = {
    skew: 0.5,
    step: 1e-5,
    frame: null,
    color: [0.2, 0.2, 0.2, 1.0],
    reverse: false,
    playing: false,
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
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;

  const container = document.getElementById("canvas-container");

  if (!container) {
    console.error("Canvas container not found");
    return;
  }

  container.style.width = `${canvas.width}px`;
  container.style.height = `${canvas.height}px`;
  container.appendChild(canvas);

  const gl = canvas.getContext("webgl");
  if (!gl) {
    console.error("WebGL not supported");
    return;
  }

  // Use TWGL for WebGL boilerplate
  const vsSource = `
    attribute float a_index;
    uniform vec2 u_resolution;
    uniform vec2 u_center;
    uniform float u_skew;

    void main() {
      float angle = u_skew * a_index;
      float r = 1.0 + angle;
      vec2 pos = vec2(r * cos(angle), r * sin(angle));
      
      // Add center offset
      vec2 p = u_center + pos;

      // Convert to clipspace
      vec2 zeroToOne = p / u_resolution;
      vec2 zeroToTwo = zeroToOne * 2.0;
      vec2 clipSpace = zeroToTwo - 1.0;

      // Flip Y because WebGL 0,0 is bottom left, Canvas top left
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
  `;

  const fsSource = `
    precision mediump float;
    uniform vec4 u_color;
    void main() {
      gl_FragColor = u_color;
    }
  `;

  // TWGL: Create Program Info
  const programInfo = twgl.createProgramInfo(gl, [vsSource, fsSource]);

  // TWGL: Create Buffer Info
  const MAX_POINTS = 100000;
  const indices = new Float32Array(MAX_POINTS);
  for (let i = 0; i < MAX_POINTS; i++) {
    indices[i] = i;
  }

  const arrays = {
    a_index: { numComponents: 1, data: indices },
  };
  const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

  function draw() {
    // Check if gl is null (already checked above, but good for TS inference if separated)
    if (!gl) return;

    twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear handled manually or by twgl if desired, but manual is fine here
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const uniforms = {
      u_resolution: [gl.canvas.width, gl.canvas.height],
      u_center: [gl.canvas.width / 2, gl.canvas.height / 2],
      u_skew: state.skew,
      u_color: state.color,
    };

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);

    const maxIterations = Math.floor(
      Math.max(gl.canvas.width, gl.canvas.height) * 2,
    );
    const count = Math.min(maxIterations, MAX_POINTS);

    twgl.drawBufferInfo(gl, bufferInfo, gl.LINE_STRIP, count);
  }

  function stop() {
    if (state.frame !== null) {
      window.cancelAnimationFrame(state.frame);
      state.frame = null;
    }
  }

  function play() {
    draw();
    state.skew += state.step * (state.reverse ? -1 : 1);
    state.frame = window.requestAnimationFrame(play);
  }

  window.togglePlay = () => {
    if (state.playing) {
      state.playing = false;
      stop();
    } else {
      state.playing = true;
      play();
    }
  };

  window.flip = () => {
    state.reverse = !state.reverse;
  };

  // start itself
  window.togglePlay();
};
