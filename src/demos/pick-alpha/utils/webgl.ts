export function compileShader({
  gl,
  type,
  source,
}: {
  gl: WebGL2RenderingContext
  type: number
  source: string
}) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Shader compile error: ${info}`)
  }
  return shader
}

export function createProgram({
  gl,
  vertexShader,
  fragmentShader,
}: {
  gl: WebGL2RenderingContext
  vertexShader: string
  fragmentShader: string
}) {
  const vs = compileShader({ gl, type: gl.VERTEX_SHADER, source: vertexShader })
  const fs = compileShader({ gl, type: gl.FRAGMENT_SHADER, source: fragmentShader })

  const program = gl.createProgram()!
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(`Program link error: ${info}`)
  }
  return program
}

export function createTexture({
  gl,
  image,
}: {
  gl: WebGL2RenderingContext
  image: HTMLImageElement
}) {
  const texture = gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
  gl.generateMipmap(gl.TEXTURE_2D)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  return texture
}

export function createFullRenderAreaVAO({
  gl,
  program,
}: {
  gl: WebGL2RenderingContext
  program: WebGLProgram
}) {
  const vao = gl.createVertexArray()!
  gl.bindVertexArray(vao)
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)

  /* eslint-disable */
  const bufferData = new Float32Array([
      -1, -1, 0, 0,
      1, -1, 1, 0,
      -1, 1, 0, 1,
      1, 1, 1, 1
  ])
  /* eslint-enable */
  const buffer = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW)

  const stride = 4 * Float32Array.BYTES_PER_ELEMENT

  const posLoc = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(posLoc)
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, stride, 0)

  const texLoc = gl.getAttribLocation(program, 'a_texCoord')
  gl.enableVertexAttribArray(texLoc)
  gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, stride, 2 * Float32Array.BYTES_PER_ELEMENT)

  gl.bindVertexArray(null)
  return vao
}
