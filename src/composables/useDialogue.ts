import type { DialogueLine, ExpressionName } from '@/types/prologue'

/**
 * 对话流程控制 Composable
 * 提供对话能力，可被任何 stage 复用
 *
 * @param script - 对话脚本数组
 */
export function useDialogue(script: DialogueLine[]) {
  const lines = ref<DialogueLine[]>(script)
  const currentIndex = ref(0)
  const isTyping = ref(false)

  // 当前对话行
  const currentLine = computed(() => lines.value[currentIndex.value])

  // 当前文本
  const currentText = computed(() => currentLine.value?.text ?? '')

  // 当前表情
  const currentExpression = computed<ExpressionName>(
    () => currentLine.value?.expression ?? 'neutral',
  )

  // 当前说话者
  const currentSpeaker = computed(() => currentLine.value?.speaker ?? '尤莉娅')

  // 是否到达末尾（对话完成）
  const isDialogueComplete = computed(
    () => currentIndex.value >= lines.value.length,
  )

  // 是否是最后一句
  const isLastLine = computed(
    () => currentIndex.value === lines.value.length - 1,
  )

  /**
   * 前进到下一句对话
   * 如果正在打字或已完成则忽略
   */
  function next() {
    if (isTyping.value || isDialogueComplete.value)
      return

    if (currentIndex.value < lines.value.length - 1) {
      currentIndex.value++
    }
    else {
      // 最后一句，标记完成
      currentIndex.value = lines.value.length
    }
  }

  /**
   * 设置打字状态
   */
  function setTyping(typing: boolean) {
    isTyping.value = typing
  }

  /**
   * 重置到开头
   */
  function reset() {
    currentIndex.value = 0
    isTyping.value = false
  }

  /**
   * 加载新脚本
   */
  function loadScript(newLines: DialogueLine[]) {
    lines.value = newLines
    reset()
  }

  return {
    // 状态
    currentText,
    currentExpression,
    currentSpeaker,
    currentIndex,
    isTyping,
    isDialogueComplete,
    isLastLine,

    // 方法
    next,
    setTyping,
    reset,
    loadScript,
  }
}
