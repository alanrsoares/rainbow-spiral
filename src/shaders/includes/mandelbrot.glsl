// --- MANDELBROT SET WITH SMOOTH ITERATION ---
// Based on Inigo Quilez's smooth Mandelbrot technique
// https://iquilezles.org/articles/msetsmooth/
// Additional techniques from https://gpfault.net/posts/mandelbrot-webgl.txt.html

const float MANDELBROT_B = 256.0;

float mandelbrotIteration(vec2 c, int maxIter) {
    // Optimization: skip computation inside main cardioid (M1)
    // https://iquilezles.org/articles/mset1bulb
    float c2 = dot(c, c);
    if (256.0 * c2 * c2 - 96.0 * c2 + 32.0 * c.x - 3.0 < 0.0) return 0.0;

    // Optimization: skip computation inside period-2 bulb (M2)
    // https://iquilezles.org/articles/mset2bulb
    if (16.0 * (c2 + 2.0 * c.x + 1.0) - 1.0 < 0.0) return 0.0;

    float n = 0.0;
    vec2 z = vec2(0.0);

    for (int i = 0; i < 1024; i++) {
        if (i >= maxIter) break;

        // z = z^2 + c
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;

        if (dot(z, z) > MANDELBROT_B * MANDELBROT_B) break;

        n += 1.0;
    }

    // Points inside the set
    if (n >= float(maxIter) - 1.0) return 0.0;

    // Smooth iteration count using double logarithm
    float sn = n - log2(log2(dot(z, z))) + 4.0;

    // Blend between integer and smooth based on time for visual effect
    float blend = smoothstep(-0.1, 0.0, sin(0.5 * 6.2831 * u_time * 0.1));
    return mix(n, sn, blend);
}

// Color palette using cosine gradient (from gpfault.net)
// a + b * cos(2π * (c*t + d))
vec3 cosinePalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

// Color the Mandelbrot set based on smooth iteration count
vec3 mandelbrotColor(float iterations, int maxIter) {
    // Points inside the set are black
    if (iterations < 0.5) {
        return vec3(0.0);
    }

    // Normalize iteration count
    float t = iterations / float(maxIter) * u_colorCycles;

    // Cosine palette with configurable cycling
    // These parameters create a nice blue-orange-white palette
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.0, 0.1, 0.2);

    return cosinePalette(t + u_time * 0.02, a, b, c, d);
}

// Render Mandelbrot with animated zoom and rotation
vec3 renderMandelbrot(vec2 uv) {
    // Zoom animation - oscillates with time
    float zoomFactor = 0.62 + 0.38 * cos(0.07 * u_time * u_speed);

    // Rotation that varies with zoom level
    float rotationSpeed = 0.15 * (1.0 - zoomFactor) * u_time * u_speed;
    float cosA = cos(rotationSpeed);
    float sinA = sin(rotationSpeed);

    // Apply exponential zoom for dramatic effect
    zoomFactor = pow(zoomFactor, 8.0);

    // Rotate UV coordinates
    vec2 rotatedUV = vec2(
        uv.x * cosA - uv.y * sinA,
        uv.x * sinA + uv.y * cosA
    );

    // Apply mouse offset for interaction (scaled by zoom)
    vec2 mouseOffset = u_mouse * 0.3 * zoomFactor;

    // Final complex coordinate using configurable zoom center
    vec2 c = u_zoomCenter + rotatedUV * zoomFactor + mouseOffset;

    // Get smooth iteration count
    float iterations = mandelbrotIteration(c, u_maxIterations);

    // Get color
    vec3 col = mandelbrotColor(iterations, u_maxIterations);

    // Add optional glow effect at boundaries
    if (iterations > 0.5) {
        float glowIntensity = u_coreGlow * 5.0;
        float boundaryGlow = exp(-iterations * 0.02) * glowIntensity;
        col += boundaryGlow * hsv2rgb(vec3(u_time * 0.05, 0.8, 1.0));
    }

    return col;
}
