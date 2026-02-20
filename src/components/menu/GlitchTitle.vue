<script setup lang="ts">
import type { GlitchConfig } from '@/types/glitch'
import { useGlitchCanvas } from '@/composables/useGlitchCanvas'

interface Props {
  /** 显示文字 */
  text: string
  /** 故障强度 (1-100)，默认 30 */
  intensity?: number
  /** 字体大小，默认 20 */
  fontSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  intensity: 30,
  fontSize: 20,
})

const config = computed<GlitchConfig>(() => ({
  text: props.text,
  intensity: props.intensity,
  fontSize: props.fontSize,
}))

const { canvasRef, resize } = useGlitchCanvas(config)

const containerRef = ref<HTMLDivElement | null>(null)
const { width, height } = useElementSize(containerRef)

watch([width, height], ([w, h]) => {
  if (w > 0 && h > 0) {
    resize(w, h)
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="glitch-title-container"
  >
    <canvas
      ref="canvasRef"
      class="glitch-canvas"
    />
  </div>
</template>

<style scoped>
.glitch-title-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 40px;
  overflow: hidden;
}

.glitch-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}
</style>
