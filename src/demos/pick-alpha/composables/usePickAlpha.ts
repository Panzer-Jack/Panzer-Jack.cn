import fs from '../shaders/fs.glsl?raw'
import vs from '../shaders/vs.glsl?raw'
import { createFullRenderAreaVAO, createProgram, createTexture } from '../utils/webgl'

export const usePickAlpha = ({ canvas }: { canvas: Ref<HTMLCanvasElement | null> }) => {
  const pickColor = ref<[number, number, number]>([0, 0, 0])
  const tolerance = ref(0)
  const hasImage = ref(false)

  let gl: WebGL2RenderingContext | undefined | null
  let program: WebGLProgram | undefined
  let vao: WebGLVertexArrayObject | undefined
  let imageData: ImageData | undefined
  let texture: WebGLTexture | undefined

  const initWebGL = () => {
    gl = canvas.value?.getContext('webgl2', {
      premultipliedAlpha: false,
      preserveDrawingBuffer: true,
    })
    if (!gl) {
      console.error('WebGL2 is not supported in this browser.')
      return null
    }

    program = createProgram({ gl, vertexShader: vs, fragmentShader: fs })
    vao = createFullRenderAreaVAO({ gl, program })
  }

  const render = () => {
    if (!gl || !program || !vao)
      return

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)
    gl.bindVertexArray(vao)

    const pickColorLoc = gl.getUniformLocation(program, 'u_pickColor')
    const toleranceLoc = gl.getUniformLocation(program, 'u_tolerance')
    gl.uniform3fv(pickColorLoc, pickColor.value)
    gl.uniform1f(toleranceLoc, tolerance.value)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    gl.bindVertexArray(null)
  }

  const loadImage = (image: HTMLImageElement) => {
    if (!gl || !program || !vao || !canvas.value) {
      console.log('gl', gl, 'program', program, 'vao', vao, 'canvas', canvas.value)
      console.error('WebGL is not initialized.')
      return
    }

    canvas.value.width = image.naturalWidth
    canvas.value.height = image.naturalHeight

    const tmp = document.createElement('canvas')
    tmp.width = image.naturalWidth
    tmp.height = image.naturalHeight
    const ctx = tmp.getContext('2d')!
    ctx.drawImage(image, 0, 0)
    imageData = ctx.getImageData(0, 0, tmp.width, tmp.height)

    if (texture) {
      gl.deleteTexture(texture)
    }
    texture = createTexture({ gl, image })
    hasImage.value = true
    render()
  }

  const handleCanvasClick = (event: MouseEvent) => {
    if (!canvas.value || !imageData)
      return

    const rect = canvas.value.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / rect.width * canvas.value.width)
    const y = Math.floor((event.clientY - rect.top) / rect.height * canvas.value.height)

    const colorIdx = (y * imageData.width + x) * 4

    pickColor.value = [
      imageData.data[colorIdx] / 255,
      imageData.data[colorIdx + 1] / 255,
      imageData.data[colorIdx + 2] / 255,
    ]

    console.log('Picked color:', pickColor.value)

    render()
  }

  onMounted(() => initWebGL())
  watch([pickColor, tolerance], () => render())

  return {
    pickColor,
    tolerance,
    hasImage,
    loadImage,
    handleCanvasClick,
    render,
  }
}
