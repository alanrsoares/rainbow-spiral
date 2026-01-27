// --- UTILITY FUNCTIONS ---

// Attempt to get a pseudo-random 3D vector from a 2D input
vec3 hash3(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yxz + 33.33);
    return fract((p3.xxy + p3.yzz) * p3.zyx);
}

// Convert HSV color space to RGB
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Apply perspective shift - simulates looking into tunnel from an angle
vec2 perspectiveShift(vec2 uv, vec2 mouse) {
    float perspectiveStrength = 0.5;

    // Calculate a fake 3D ray direction based on mouse offset
    vec3 rayDir = normalize(vec3(uv, 1.0));

    // Rotate ray based on mouse position
    float tiltX = mouse.y * perspectiveStrength;
    float tiltY = -mouse.x * perspectiveStrength;

    // Apply rotation around X axis (vertical tilt)
    float cosX = cos(tiltX);
    float sinX = sin(tiltX);
    rayDir = vec3(
        rayDir.x,
        rayDir.y * cosX - rayDir.z * sinX,
        rayDir.y * sinX + rayDir.z * cosX
    );

    // Apply rotation around Y axis (horizontal tilt)
    float cosY = cos(tiltY);
    float sinY = sin(tiltY);
    rayDir = vec3(
        rayDir.x * cosY + rayDir.z * sinY,
        rayDir.y,
        -rayDir.x * sinY + rayDir.z * cosY
    );

    // Project back to 2D (perspective division)
    return rayDir.xy / rayDir.z;
}
