<script setup lang="ts">
import type { ExpressionName } from '@/types/prologue'
import { useYuliaSprite } from '@/composables/useYuliaSprite'

interface Props {
  /** 表情名称 */
  expression?: ExpressionName
  /** 缩放比例 */
  scale?: number
  /** 是否启用眨眼动画 */
  enableBlink?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  expression: 'neutral',
  scale: 1,
  enableBlink: false,
})

const { spriteStyle, setExpression, startBlinkAnimation, stopBlinkAnimation } = useYuliaSprite()

// 监听表情变化
watch(
  () => props.expression,
  (newExp) => {
    setExpression(newExp)
  },
  { immediate: true },
)

// 监听眨眼开关
watch(
  () => props.enableBlink,
  (enable) => {
    if (enable) {
      startBlinkAnimation(props.expression)
    }
    else {
      stopBlinkAnimation()
    }
  },
  { immediate: true },
)

// 计算缩放后的样式
const scaledStyle = computed(() => ({
  ...spriteStyle.value,
  transform: props.scale !== 1 ? `scale(${props.scale})` : undefined,
  transformOrigin: 'bottom center',
}))
</script>

<template>
  <div class="inline-flex items-end justify-center">
    <div
      class="yulia-sprite"
      :style="scaledStyle"
    />
  </div>
</template>

<style scoped>
/* 图片渲染优化 - UnoCSS 不支持 */
.yulia-sprite {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
</style>
