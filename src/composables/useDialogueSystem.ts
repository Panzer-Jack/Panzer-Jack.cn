import type { DialogueLine, ExpressionName } from '@/types/prologue'

export interface DialogueSystemOptions {
  /** 打字速度 (ms/字符)，默认 50 */
  speed?: number
  /** 所有对话完成时回调 */
  onDialogueComplete?: () => void
}

/**
 * 对话系统 Composable
 * 合并对话流程控制和打字机效果
 */
export function useDialogueSystem(
  script: DialogueLine[],
  options: DialogueSystemOptions = {},
) {
  const { speed = 50, onDialogueComplete } = options

  // === 对话状态 ===
  const lines = ref<DialogueLine[]>(script)
  const currentIndex = ref(0)

  // === 打字机状态 ===
  const displayedText = ref('')
  const isTyping = ref(false)
  let typeTimer: ReturnType<typeof setTimeout> | null = null
  let charIndex = 0

  // === 计算属性 ===
  const currentLine = computed(() => lines.value[currentIndex.value])
  const currentText = computed(() => currentLine.value?.text ?? '')
  const currentExpression = computed<ExpressionName>(
    () => currentLine.value?.expression ?? 'neutral',
  )
  const currentSpeaker = computed(() => currentLine.value?.speaker ?? '尤莉娅')
  const isDialogueComplete = computed(
    () => currentIndex.value >= lines.value.length,
  )
  const isLastLine = computed(
    () => currentIndex.value === lines.value.length - 1,
  )
  const isLineComplete = computed(
    () => !isTyping.value && displayedText.value === currentText.value,
  )

  // === 打字机核心逻辑 ===
  function stopTyping() {
    if (typeTimer) {
      clearTimeout(typeTimer)
      typeTimer = null
    }
  }

  function startTyping(text: string) {
    stopTyping()
    displayedText.value = ''
    charIndex = 0
    isTyping.value = true

    function typeNextChar() {
      if (charIndex < text.length) {
        displayedText.value += text[charIndex]
        charIndex++
        typeTimer = setTimeout(typeNextChar, speed)
      }
      else {
        isTyping.value = false
        // 如果是最后一句且打字完成，触发对话完成回调
        if (isLastLine.value) {
          onDialogueComplete?.()
        }
      }
    }
    typeNextChar()
  }

  function skipToEnd() {
    stopTyping()
    displayedText.value = currentText.value
    charIndex = currentText.value.length
    isTyping.value = false
    // 如果是最后一句，触发对话完成回调
    if (isLastLine.value) {
      onDialogueComplete?.()
    }
  }

  // === 对话流程控制 ===
  function next() {
    // 如果正在打字，快进到结束
    if (isTyping.value) {
      skipToEnd()
      return
    }

    // 如果当前行已完成，前进到下一句
    if (isLineComplete.value && !isDialogueComplete.value) {
      if (currentIndex.value < lines.value.length - 1) {
        currentIndex.value++
      }
      else {
        // 最后一句已完成，标记对话结束
        currentIndex.value = lines.value.length
      }
    }
  }

  function reset() {
    stopTyping()
    currentIndex.value = 0
    displayedText.value = ''
    isTyping.value = false
    charIndex = 0
  }

  function loadScript(newLines: DialogueLine[]) {
    lines.value = newLines
    reset()
  }

  // === 监听文本变化，自动开始打字 ===
  watch(currentText, (newText) => {
    if (newText && !isDialogueComplete.value) {
      startTyping(newText)
    }
  }, { immediate: true })

  // === 清理 ===
  onUnmounted(() => {
    stopTyping()
  })

  return {
    // 显示状态 (供 v-model 绑定)
    displayedText,
    isTyping,

    // 对话信息
    currentExpression,
    currentSpeaker,
    currentIndex,
    isDialogueComplete,
    isLastLine,
    isLineComplete,

    // 方法
    next,
    skipToEnd,
    reset,
    loadScript,
  }
}
