window.startApp = () => {
  const state = {
    skew: 0.5,
    step: 1e-5,
    frame: null,
    color: "#333",
    reverse: false,
    playing: false
  };

  function getCanvasSize() {
    const body = document.body;
    const keys = ["scroll", "offset", "client"];

    const maxDimension = dimension => Math.max(...keys.map(key => key + dimension).filter(attribute => !!body[attribute]).map(attribute => body[attribute]));

    return ["Height", "Width"].map(maxDimension);
  }

  function makeCanvas([height, width]) {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  const canvas = makeCanvas(getCanvasSize());
  canvas.style = `width: ${canvas.width}px; height: ${canvas.height}px`;
  const container = document.getElementById("canvas-container");
  container.style = `width: ${canvas.width}px; height: ${canvas.height}px`;
  container.appendChild(canvas);
  state.ctx = canvas.getContext("2d");
  state.center = {
    x: canvas.width / 2,
    y: canvas.height / 2
  };

  function draw() {
    state.ctx.clearRect(0, 0, canvas.width, canvas.height);
    state.ctx.moveTo(state.center.x, state.center.y);
    state.ctx.beginPath();
    const maxIterations = Math.max(canvas.width, canvas.height) * 2;

    for (let i = 0; i < maxIterations; i++) {
      const angle = state.skew * i;

      const pos = (fn, x) => x + (1 + 1 * angle) * fn(angle);

      const point = {
        x: pos(Math.cos, state.center.x),
        y: pos(Math.sin, state.center.y)
      };
      state.ctx.lineTo(point.x, point.y);
    }

    state.ctx.strokeStyle = state.color;
    state.ctx.lineWidth = 2;
    state.ctx.stroke();
  }

  function stop() {
    window.cancelAnimationFrame(state.frame);
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
  }; // start itself


  window.togglePlay();
};