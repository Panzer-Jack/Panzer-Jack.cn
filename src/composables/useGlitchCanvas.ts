import type { GlitchBar, GlitchConfig, GlitchAnimationState } from '@/types/glitch'

// TNO 主题色
const TNO_PRIMARY = '#00d4aa'
const TNO_ACCENT = '#00ffcc'
const GLITCH_RED = '#ff003c'
const GLITCH_CYAN = '#00e5ff'

export function useGlitchCanvas(config: Ref<GlitchConfig>) {
  const canvasRef = ref<HTMLCanvasElement | null>(null)

  const state = reactive<GlitchAnimationState>({
    animationId: null,
    bars: [],
    frameCount: 0,
  })

  const intensity = computed(() => config.value.intensity ?? 30)
  const fontSize = computed(() => config.value.fontSize ?? 20)

  // ========== GlitchBar 管理 ==========
  function createBar(width: number, height: number): GlitchBar {
    const w = Math.random() * width * 0.6
    const h = Math.random() * 3 + 1
    return {
      w,
      h,
      x: Math.random() < 0.5 ? -w : width,
      y: Math.random() * height,
      speed: (Math.random() * 15 + 8) * (Math.random() < 0.5 ? 1 : -1),
      color: Math.random() < 0.1 ? GLITCH_RED
        : Math.random() < 0.1 ? GLITCH_CYAN
          : '#ffffff',
      opacity: Math.random() * 0.4 + 0.1,
    }
  }

  function resetBar(bar: GlitchBar, width: number, height: number) {
    Object.assign(bar, createBar(width, height))
  }

  function initBars(width: number, height: number, count = 5) {
    state.bars = Array.from({ length: count }, () => createBar(width, height))
  }

  // ========== 绘制函数 ==========
  function drawScanlines(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.save()
    ctx.strokeStyle = `rgba(0, 212, 170, 0.03)`
    ctx.lineWidth = 1
    for (let y = 0; y < h; y += 4) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }
    ctx.restore()
  }

  function drawGlitchText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
    const jitterX = (Math.random() - 0.5) * intensity.value * 0.2
    const jitterY = (Math.random() - 0.5) * intensity.value * 0.15
    const rgbOffset = intensity.value * 0.08

    ctx.font = `bold ${fontSize.value}px "Courier New", monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // RGB 色散层
    ctx.save()
    ctx.globalAlpha = 0.6
    ctx.fillStyle = 'rgba(255, 0, 60, 0.7)'
    ctx.fillText(text, x + jitterX + rgbOffset, y + jitterY)
    ctx.fillStyle = 'rgba(0, 255, 255, 0.7)'
    ctx.fillText(text, x - jitterX - rgbOffset, y - jitterY)
    ctx.restore()

    // 主文字层
    ctx.fillStyle = TNO_ACCENT
    ctx.shadowColor = TNO_PRIMARY
    ctx.shadowBlur = 8
    ctx.fillText(text, x, y)
    ctx.shadowBlur = 0
  }

  function applySliceGlitch(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    w: number,
    h: number,
  ) {
    if (Math.random() > 0.25) return

    const numSlices = Math.floor(Math.random() * (intensity.value / 15)) + 1
    for (let i = 0; i < numSlices; i++) {
      const sy = Math.random() * h
      const sh = Math.random() * (intensity.value / 4) + 2
      const dx = (Math.random() - 0.5) * intensity.value * 0.4
      ctx.drawImage(canvas, 0, sy, w, sh, dx, sy, w, sh)
    }
  }

  function drawNoise(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    const noiseLevel = intensity.value / 8

    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < 0.03) {
        const noise = (Math.random() - 0.5) * noiseLevel
        data[i] = Math.min(255, Math.max(0, data[i] + noise))
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise))
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise))
      }
    }
    ctx.putImageData(imageData, 0, 0)
  }

  // ========== 动画循环 ==========
  function animate() {
    const canvas = canvasRef.value
    if (!canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const { width: w, height: h } = canvas

    // 清除画布（保持透明背景）
    ctx.clearRect(0, 0, w, h)

    drawScanlines(ctx, w, h)
    drawGlitchText(ctx, config.value.text, w / 2, h / 2)
    applySliceGlitch(ctx, canvas, w, h)

    // 噪点效果 (降低频率)
    if (state.frameCount % 3 === 0) {
      drawNoise(ctx, w, h)
    }

    state.frameCount++
    state.animationId = requestAnimationFrame(animate)
  }

  // ========== 生命周期 ==========
  function start() {
    const canvas = canvasRef.value
    if (!canvas) return
    initBars(canvas.width, canvas.height)
    animate()
  }

  function stop() {
    if (state.animationId !== null) {
      cancelAnimationFrame(state.animationId)
      state.animationId = null
    }
  }

  function resize(width: number, height: number) {
    const canvas = canvasRef.value
    if (canvas) {
      canvas.width = width
      canvas.height = height
      initBars(width, height)
    }
  }

  onMounted(() => start())
  onUnmounted(() => stop())

  return { canvasRef, start, stop, resize }
}
