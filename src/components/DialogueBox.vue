<script setup lang="ts">
import { useTypewriter } from '@/composables/useTypewriter'

interface Props {
  /** 说话者名字 */
  speaker?: string
  /** 对话文本 */
  text: string
  /** 打字速度 */
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  speaker: '尤莉娅',
  speed: 50,
})

const emit = defineEmits<{
  /** 打字完成 */
  complete: []
  /** 点击继续 */
  continue: []
}>()

const { displayedText, isTyping, isComplete, typeText, skipToEnd } = useTypewriter({
  speed: props.speed,
  onComplete: () => emit('complete'),
})

// 监听文本变化，开始打字
watch(
  () => props.text,
  (newText) => {
    if (newText) {
      typeText(newText)
    }
  },
  { immediate: true },
)

// 处理点击
function handleClick() {
  if (isTyping.value) {
    skipToEnd()
  }
  else if (isComplete.value) {
    emit('continue')
  }
}

// 键盘事件
function handleKeydown(e: KeyboardEvent) {
  if (e.code === 'Space' || e.code === 'Enter') {
    e.preventDefault()
    handleClick()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="dialogue-box relative w-full max-w-800px px-24px py-20px rounded-4px cursor-pointer select-none" @click.stop="handleClick">
    <!-- 角色名 -->
    <div v-if="speaker" class="speaker-name absolute top--14px left-20px px-16px py-4px rounded-2px">
      <span class="text-14px font-bold text-text-primary tracking-2px">{{ speaker }}</span>
    </div>

    <!-- 对话内容 -->
    <div class="min-h-60px pt-8px">
      <p class="text-18px leading-1.8 text-text-primary tracking-1px">
        {{ displayedText }}<span v-if="isTyping" class="cursor text-violet-glow">|</span>
      </p>
    </div>

    <!-- 继续提示 -->
    <div v-if="isComplete" class="absolute right-20px bottom-12px">
      <span class="indicator-arrow text-14px text-violet-glow">▼</span>
    </div>
  </div>
</template>

<style scoped>
/* 多层阴影和边框 - 无法用 UnoCSS 表示 */
.dialogue-box {
  background: rgba(13, 10, 14, 0.95);
  border: 2px solid #7b2cbf;
  box-shadow:
    0 0 15px rgba(123, 44, 191, 0.4),
    inset 0 0 30px rgba(0, 0, 0, 0.5);
}

/* 渐变背景和阴影 - 无法用 UnoCSS 表示 */
.speaker-name {
  background: linear-gradient(135deg, #4a0080, #7b2cbf);
  box-shadow: 0 2px 8px rgba(74, 0, 128, 0.5);
}

/* 闪烁动画 - 必须保留 */
.cursor {
  animation: blink 0.5s infinite;
}

/* 弹跳动画 - 必须保留 */
.indicator-arrow {
  animation: bounce 0.8s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}
</style>
