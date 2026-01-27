export interface TypewriterOptions {
  /** 打字速度 (ms/字符) */
  speed?: number
  /** 完成回调 */
  onComplete?: () => void
}

/**
 * 打字机效果 Composable
 */
export function useTypewriter(options: TypewriterOptions = {}) {
  const { speed = 50, onComplete } = options

  const displayedText = ref('')
  const fullText = ref('')
  const isTyping = ref(false)
  const isComplete = ref(false)

  let typeTimer: ReturnType<typeof setTimeout> | null = null
  let currentIndex = 0

  /**
   * 开始打字
   */
  async function typeText(text: string): Promise<void> {
    // 重置状态
    stop()
    fullText.value = text
    displayedText.value = ''
    currentIndex = 0
    isTyping.value = true
    isComplete.value = false

    return new Promise((resolve) => {
      function typeNextChar() {
        if (currentIndex < text.length) {
          displayedText.value += text[currentIndex]
          currentIndex++
          typeTimer = setTimeout(typeNextChar, speed)
        }
        else {
          isTyping.value = false
          isComplete.value = true
          onComplete?.()
          resolve()
        }
      }
      typeNextChar()
    })
  }

  /**
   * 快进到结束
   */
  function skipToEnd() {
    if (typeTimer) {
      clearTimeout(typeTimer)
      typeTimer = null
    }
    displayedText.value = fullText.value
    currentIndex = fullText.value.length
    isTyping.value = false
    isComplete.value = true
    onComplete?.()
  }

  /**
   * 停止打字
   */
  function stop() {
    if (typeTimer) {
      clearTimeout(typeTimer)
      typeTimer = null
    }
    isTyping.value = false
  }

  /**
   * 重置
   */
  function reset() {
    stop()
    displayedText.value = ''
    fullText.value = ''
    currentIndex = 0
    isComplete.value = false
  }

  /**
   * 清理
   */
  onUnmounted(() => {
    stop()
  })

  return {
    displayedText,
    fullText,
    isTyping,
    isComplete,
    typeText,
    skipToEnd,
    stop,
    reset,
  }
}
