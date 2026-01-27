precision highp float;

#include "includes/uniforms.glsl"
#include "includes/structs.glsl"
#include "includes/utils.glsl"
#include "includes/tunnel.glsl"
#include "includes/effects.glsl"

void main() {
    // Normalized coordinates
    vec2 baseUV = (gl_FragCoord.xy - u_resolution.xy * 0.5) / min(u_resolution.x, u_resolution.y);

    // Apply perspective shift based on mouse position
    baseUV = perspectiveShift(baseUV, u_mouse);

    vec3 finalColor = vec3(0.0);

    // Chromatic Aberration Loop
    for (int i = 0; i < 3; i++) {
        // Offset for RGB channels
        float chromaticOffset = float(i - 1) * u_chromatic * (1.0 + length(baseUV));
        vec2 p = baseUV + vec2(chromaticOffset);

        vec3 layerCol = renderLayer(p);

        if (i == 0) finalColor.r = layerCol.r;
        else if (i == 1) finalColor.g = layerCol.g;
        else finalColor.b = layerCol.b;
    }

    finalColor = pow(finalColor, vec3(u_gamma));
    gl_FragColor = vec4(finalColor, 1.0);
}
