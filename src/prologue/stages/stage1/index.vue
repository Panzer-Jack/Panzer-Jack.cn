<script setup lang="ts">
import DialogueBox from '@/components/DialogueBox.vue'
import { useDialogueSystem } from '@/composables/useDialogueSystem'
import type { StageProps } from '@/prologue/types/stage'
import { dialogueScript } from './scripts'

// Props
defineProps<StageProps>()

// Emits
const emit = defineEmits<{
  complete: []
}>()

// 使用对话系统（合并了对话流程和打字效果）
const {
  displayedText,
  isTyping,
  currentExpression,
  currentSpeaker,
  next,
} = useDialogueSystem(dialogueScript, {
  speed: 50,
  onDialogueComplete: () => emit('complete'),
})

// 是否显示内容（淡入效果）
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

// 点击继续（智能处理：打字中则快进，完成则下一句）
function handleClick() {
  next()
}

onMounted(() => {
  window.addEventListener('keydown', handleClick)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleClick)
})
</script>

<template>
  <div
    class="dialogue-stage fixed inset-0 flex flex-col items-center justify-end pb-60px cursor-pointer"
    @click.stop="handleClick"
  >
    <!-- 背景 -->
    <div class="stage-bg absolute inset-0 z--1" />

    <!-- 主内容区 -->
    <Transition name="content-fade">
      <div v-if="isVisible" class="flex flex-col items-center w-full max-w-900px px-20px">
        <!-- 尤莉娅精灵图 (预留)
        <div class="mb-40px">
          <YuliaSprite
            :expression="currentExpression"
            :scale="1.5"
            :enable-blink="true"
          />
        </div> -->

        <!-- 对话框：使用 v-model 绑定 displayedText -->
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
/* 渐变背景 */
.stage-bg {
  background: linear-gradient(
    180deg,
    #0d0a0e 0%,
    #1a1520 50%,
    #0d0a0e 100%
  );
}

/* Vue Transition 动画 */
.content-fade-enter-active {
  transition: all 0.8s ease;
}

.content-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
