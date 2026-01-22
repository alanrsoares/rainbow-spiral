/**
 * Fragment shader source code
 */
export const fsSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_speed;

    vec3 hash3(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
      p3 += dot(p3, p3.yxz+33.33);
      return fract((p3.xxy+p3.yzz)*p3.zyx);
    }

    // Seamless Bilinear Color Interpolation
    vec3 bilinearColor(vec2 uv) {
      vec2 i = floor(uv);
      vec2 f = fract(uv);

      // --- SEAMLESS WRAPPING ---
      // We assume the X coordinate (angle) repeats every 8.0 units (derived from main)
      // We modulo the integer coordinates to ensuring checking neighbor (7+1) wraps to 0
      const float period = 8.0;

      // Wrap the x-component of the 4 grid corners
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

    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - u_resolution.xy * 0.5) / min(u_resolution.x, u_resolution.y);
      uv -= u_mouse * 0.3;

      vec3 finalColor = vec3(0.0);
      
      for (int i = 0; i < 3; i++) {
        float offset = float(i - 1) * 0.005 * (1.0 + length(uv));
        vec2 p = uv + vec2(offset);

        float r = length(p);
        float a = atan(p.y, p.x); // -PI to PI

        float z = 1.0 / r + u_time * u_speed;
        
        // --- SEAMLESS MAPPING CONFIG ---
        // Map angle (-PI to PI) to (0 to 8.0)
        // (a + PI) makes it 0 to 2PI
        // / (2PI) makes it 0 to 1
        // * 8.0 makes it 0 to 8
        float normalizedAngle = (a + 3.14159) / 6.28318 * 8.0;
        
        vec2 polarUV = vec2(normalizedAngle, z * 2.0);
        
        // Sample with seamless bilinear logic
        vec3 col = bilinearColor(polarUV + u_time * 0.5);

        // Pattern logic must also be seamless
        // normalizedAngle * PI * 2 is back to radians logic roughly
        // Let's use 'a' directly for sine waves as that is naturally seamless
        float pattern = sin(a * 4.0 + z * 2.0 + u_time) + sin(z * 4.0 - u_time);
        
        col = mix(col, hsv2rgb(vec3(fract(col.r + u_time * 0.1), 0.8, 1.0)), 0.5);
        
        float electricity = 0.015 / abs(sin(z * 8.0 + a * 4.0 + u_time * 2.0));
        col += vec3(electricity) * col * 2.0;

        float fog = smoothstep(0.0, 0.7, r);
        col *= fog;

        float coreGlow = 0.04 / (r + 0.04);
        col += vec3(coreGlow) * hsv2rgb(vec3(u_time * 0.1, 0.7, 1.0));

        if (i == 0) finalColor.r = col.r;
        else if (i == 1) finalColor.g = col.g;
        else finalColor.b = col.b;
      }
      
      finalColor = pow(finalColor, vec3(1.1));
      gl_FragColor = vec4(finalColor, 1.0);
    }
`;
