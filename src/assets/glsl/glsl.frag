uniform float uTick;

void main() {
  vec3 color = vec3((sin(uTick) + 1.0)/2.0, 0.0, (cos(uTick) + 1.0)/2.0);
  gl_FragColor = vec4(color, 1.0);
}