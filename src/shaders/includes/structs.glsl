// --- STRUCTS ---
struct TunnelCoords {
    float r;      // Radius (distance from center)
    float a;      // Angle (-PI to PI)
    float z;      // Depth (1/r)
    vec2 polarUV; // Seamless polar grid coordinates
};
