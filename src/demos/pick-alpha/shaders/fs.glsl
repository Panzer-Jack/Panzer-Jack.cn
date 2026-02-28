#version 300 es
precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_image;
uniform vec3 u_pickColor;
uniform float u_tolerance;

out vec4 outColor;

const mat3 rgb2ycbcr = mat3(
  0.299,  -0.169,   0.500,
  0.587,  -0.331,  -0.419,
  0.114,   0.500,  -0.081
);


void main() {
  vec4 color = texture(u_image, v_texCoord);
  vec3 rgb = color.rgb;

  vec3 pickYcbcr = rgb2ycbcr * u_pickColor;

  float dist = distance(rgb2ycbcr * rgb, pickYcbcr);

  // 使用 smoothstep 实现柔和的边缘过渡
  float edge = u_tolerance * 0.15;
  float alpha = smoothstep(u_tolerance - edge, u_tolerance + edge, dist);

  outColor = vec4(rgb, alpha);
}

