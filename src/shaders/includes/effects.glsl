// --- VISUAL EFFECTS ---

// Sine wave pattern for visual variation
float getPattern(TunnelCoords t) {
    return sin(t.a * 4.0 + t.z * 2.0 + u_time) + sin(t.z * 4.0 - u_time);
}

// Electric/lightning effect
float getElectricity(TunnelCoords t) {
    return 0.015 / abs(sin(t.z * 8.0 + t.a * 4.0 + u_time * 2.0));
}

// Render a single layer of the tunnel effect
vec3 renderLayer(vec2 uv) {
    TunnelCoords t = getTunnelCoords(uv);

    // 1. Base Grid Color
    vec3 col = getGridColor(t.polarUV + u_time * 0.5);

    // 2. Modulate with Acid Pattern
    float pattern = getPattern(t);
    vec3 acidShift = hsv2rgb(vec3(fract(col.r + u_time * 0.1), 0.8, 1.0));
    col = mix(col, acidShift, u_acidIntensity);

    // 3. Add Electricity
    col += vec3(getElectricity(t)) * col * u_electricity;

    // 4. Fog / Depth
    float fog = smoothstep(0.0, 0.7, t.r);
    col *= fog;

    // 5. Core Glow
    float coreGlowValue = u_coreGlow / (t.r + u_coreGlow);
    col += vec3(coreGlowValue) * hsv2rgb(vec3(u_time * 0.1, 0.7, 1.0));

    return col;
}
