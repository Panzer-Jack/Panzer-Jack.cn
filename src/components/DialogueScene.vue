<script setup lang="ts">
import type { DialogueLine } from '@/types/prologue'
import { useDialogueSystem } from '@/composables/useDialogueSystem'

interface Props {
  /** 对话脚本（必填） */
  scripts: DialogueLine[]
  /** 打字速度 (ms/字符)，默认 50 */
  speed?: number
  /** 是否显示立绘，默认 true */
  showPortrait?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  speed: 50,
  showPortrait: true,
})

const emit = defineEmits<{
  complete: []
}>()

const {
  displayedText,
  isTyping,
  currentExpression,
  currentSpeaker,
  next,
} = useDialogueSystem(props.scripts, {
  speed: props.speed,
  onDialogueComplete: () => emit('complete'),
})

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

function handleClick() {
  next()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
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
  <div
    class="flex flex-col items-center w-full cursor-pointer mb-10px"
    @click.stop="handleClick"
  >
    <Transition name="content-fade">
      <div
        v-if="isVisible"
        class="flex flex-col items-center w-full max-w-800px px-20px"
      >
        <!-- 立绘（居中上方） -->
        <div
          v-if="showPortrait"
          class="mb--20px"
        >
          <CharacterPortrait
            :expression="currentExpression"
          />
        </div>

        <!-- 对话框 -->
        <div class="w-full">
          <DialogueBox
            v-model="displayedText"
            :speaker="currentSpeaker"
            :typing="isTyping"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Vue Transition 动画 */
.content-fade-enter-active {
  transition: all 0.8s ease;
}

.content-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
