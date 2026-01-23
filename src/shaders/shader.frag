precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_speed;

// --- STRUCTS ---
struct TunnelCoords {
    float r;      // Radius (distance from center)
    float a;      // Angle (-PI to PI)
    float z;      // Depth (1/r)
    vec2 polarUV; // Seamless polar grid coordinates (8x wrapping)
};

// --- UTILS ---

vec3 hash3(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
  p3 += dot(p3, p3.yxz+33.33);
  return fract((p3.xxy+p3.yzz)*p3.zyx);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// --- GENERATORS ---

// Seamless Bilinear Color Grid
vec3 getGridColor(vec2 uv) {
  vec2 i = floor(uv);
  vec2 f = fract(uv);

  const float period = 8.0;

  // Wrap x-component for seamless tube
  vec2 p00 = vec2(mod(i.x, period), i.y);
  vec2 p10 = vec2(mod(i.x + 1.0, period), i.y);
  vec2 p01 = vec2(mod(i.x, period), i.y + 1.0);
  vec2 p11 = vec2(mod(i.x + 1.0, period), i.y + 1.0);

  vec3 c00 = hash3(p00);
  vec3 c10 = hash3(p10);
  vec3 c01 = hash3(p01);
  vec3 c11 = hash3(p11);

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(mix(c00, c10, u.x), mix(c01, c11, u.x), u.y);
}

TunnelCoords getTunnelCoords(vec2 uv) {
    float r = length(uv);
    float a = atan(uv.y, uv.x);
    float z = 1.0 / r + u_time * u_speed;
    
    // Map angle (-PI to PI) to (0 to 8.0) for seamless grid
    float normalizedAngle = (a + 3.14159) / 6.28318 * 8.0;
    vec2 polarUV = vec2(normalizedAngle, z * 2.0);

    return TunnelCoords(r, a, z, polarUV);
}

float getPattern(TunnelCoords t) {
    // Seamless sine wave combinations
    return sin(t.a * 4.0 + t.z * 2.0 + u_time) + sin(t.z * 4.0 - u_time);
}

float getElectricity(TunnelCoords t) {
    return 0.015 / abs(sin(t.z * 8.0 + t.a * 4.0 + u_time * 2.0));
}

vec3 renderLayer(vec2 uv) {
    TunnelCoords t = getTunnelCoords(uv);

    // 1. Base Grid Color
    vec3 col = getGridColor(t.polarUV + u_time * 0.5);

    // 2. Modulate with Acid Pattern
    float pattern = getPattern(t);
    vec3 acidShift = hsv2rgb(vec3(fract(col.r + u_time * 0.1), 0.8, 1.0));
    col = mix(col, acidShift, 0.5);

    // 3. Add Electricity
    col += vec3(getElectricity(t)) * col * 2.0;

    // 4. Fog / Depth
    float fog = smoothstep(0.0, 0.7, t.r);
    col *= fog;

    // 5. Core Glow
    float coreGlow = 0.04 / (t.r + 0.04);
    col += vec3(coreGlow) * hsv2rgb(vec3(u_time * 0.1, 0.7, 1.0));

    return col;
    // return vec3(1.0, 0.0, 0.0);
}

void main() {
  // Normalized coordinates
  vec2 baseUV = (gl_FragCoord.xy - u_resolution.xy * 0.5) / min(u_resolution.x, u_resolution.y);
  baseUV -= u_mouse * 0.3;

  vec3 finalColor = vec3(0.0);
  
  // Chromatic Aberration Loop
  for (int i = 0; i < 3; i++) {
    // Offset for RGB channels
    float chromaticOffset = float(i - 1) * 0.005 * (1.0 + length(baseUV));
    vec2 p = baseUV + vec2(chromaticOffset);

    vec3 layerCol = renderLayer(p);

    if (i == 0) finalColor.r = layerCol.r;
    else if (i == 1) finalColor.g = layerCol.g;
    else finalColor.b = layerCol.b;
  }
  
  finalColor = pow(finalColor, vec3(1.1));
  gl_FragColor = vec4(finalColor, 1.0);
}
