# 🌀 Rainbow Spiral

A high-performance, mesmerising fractal spiral generator powered by **WebGL** and **Bun**.

This project has been rebuilt from a standard 2D Canvas implementation into a hardware-accelerated shader-based animation, utilizing modern development tools for an optimal developer experience.

## ✨ Features

- **GPU Accelerated:** Spiral geometry and animations are calculated directly on the GPU using GLSL shaders.
- **Modern Toolchain:** Powered by **Bun** for lightning-fast bundling and execution.
- **Type Safe:** Fully rewritten in **TypeScript** with strict type checking.
- **Refined DX:** Linting and formatting managed by **Biome**.
- **Lightweight:** Uses **TWGL.js** to minimize WebGL boilerplate while maintaining performance.

## 🚀 Getting Started

### Prerequisites

You need [Bun](https://bun.sh/) installed on your system.

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start the native Bun development server
bun start
```
The application will be available at `http://localhost:3000`.

### Building

```bash
# Build and bundle the application
bun run build
```

### Linting & Formatting

```bash
# Check for linting/formatting issues
bun run lint

# Automatically fix issues
bun run lint-fix
```

## 🛠 Tech Stack

- **Engine:** WebGL + [TWGL.js](https://twgljs.org/)
- **Runtime & Bundler:** [Bun](https://bun.sh/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Linter/Formatter:** [Biome](https://biomejs.dev/)

## 📜 License

MIT