<script setup lang="ts">
import { usePickAlpha } from './composables/usePickAlpha'

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')
const { pickColor, tolerance, hasImage, loadImage, handleCanvasClick } = usePickAlpha({ canvas: canvasRef })

const handleUpdateImg = () => {
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent)
  if (isIos) {
    const el = document.createElement('input')
    document.body.appendChild(el)
    el.type = 'file'
    el.accept = 'image/*'
    el.type = 'file'
    el.style.display = 'none'

    // 处理取消选择
    el.addEventListener('cancel', () => {
      document.body.removeChild(el)
    })

    el.addEventListener('change', () => {
      const file = el.files?.[0]
      if (file) {
        const image = new Image()
        image.onload = () => {
          loadImage(image)
          URL.revokeObjectURL(image.src)
        }
        image.src = URL.createObjectURL(file)
      }
      document.body.removeChild(el)
    })

    el.click()
  } else {
    const el = document.createElement('input')
    el.type = 'file'
    el.accept = 'image/*'
    el.style.display = 'none'

    // 处理取消选择
    el.addEventListener('cancel', () => {
      document.body.removeChild(el)
    })

    el.addEventListener('change', () => {
      const file = el.files?.[0]
      if (file) {
        const image = new Image()
        image.onload = () => {
          loadImage(image)
          URL.revokeObjectURL(image.src)
        }
        image.src = URL.createObjectURL(file)
      }
    })

    // 触发文件选择
    el.click()
  }
}

const pickColorHex = computed(() => {
  const [r, g, b] = pickColor.value
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
})
</script>

<template>
  <div>
    <Button
      label="点击上传图片"
      @click="() => handleUpdateImg()"
    />

    <div class="flex">
      <div class="flex justify-between mt-20px gap-5px items-center w-full">
        <div class="flex">
          <div
            class="w-20px h-20px rounded-full mr-5px"
            :style="{
              backgroundColor: `rgba(${pickColor[0]}, ${pickColor[1]}, ${pickColor[2]}, 1)`,
            }"
          />
          <div class="text-12px">
            Picked Color: {{ pickColorHex }}
          </div>
        </div>

        <div class="flex text-12px gap-5px">
          Tolerance:
          <input
            v-model="tolerance"
            type="range"
            min="0"
            max="1"
            step="0.01"
            class="flex-1 md:w-100px accent-#1e90ff"
          >
        </div>
      </div>
    </div>

    <canvas
      v-show="hasImage"
      ref="canvasRef"
      class="mt-20px w-full h-auto"
      @click="handleCanvasClick"
    />
  </div>
</template>
