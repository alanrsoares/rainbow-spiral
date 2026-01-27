// --- TUNNEL COORDINATE SYSTEM ---

// Seamless Bilinear Color Grid
vec3 getGridColor(vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);

    float period = u_gridPeriod;

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

// Convert screen UV to tunnel coordinates
TunnelCoords getTunnelCoords(vec2 uv) {
    float r = length(uv);
    float a = atan(uv.y, uv.x);
    float z = 1.0 / r + u_time * u_speed;

    // Map angle (-PI to PI) to (0 to gridPeriod) for seamless grid
    float normalizedAngle = (a + 3.14159) / 6.28318 * u_gridPeriod;
    vec2 polarUV = vec2(normalizedAngle, z * 2.0);

    return TunnelCoords(r, a, z, polarUV);
}
