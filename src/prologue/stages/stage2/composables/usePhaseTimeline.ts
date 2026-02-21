interface TimelineOptions {
  onComplete: () => void
}

interface PhaseConfig {
  /** 阶段持续时间 (ms) */
  duration: number
}

/** 各阶段时间配置 */
const PHASES: PhaseConfig[] = [
  { duration: 1000 }, // Phase 0: 黑幕呼吸
  { duration: 3000 }, // Phase 1: 极光觉醒
  { duration: 2500 }, // Phase 2: 标题爆发
  { duration: 2000 }, // Phase 3: 收束归寂
]

/**
 * 阶段时间轴编排
 *
 * 管理动画阶段的自动推进和用户交互（点击快进）。
 * 每个 Phase 的 CSS 动画由组件自身控制，此 composable 只控制 Phase 可见时机。
 */
export function usePhaseTimeline(options: TimelineOptions) {
  const currentPhase = ref(0)
  const isFinished = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null

  function scheduleNextPhase() {
    if (isFinished.value)
      return
    const phase = PHASES[currentPhase.value]
    if (!phase) {
      finish()
      return
    }
    timer = setTimeout(() => advancePhase(), phase.duration)
  }

  function advancePhase() {
    if (currentPhase.value < PHASES.length - 1) {
      currentPhase.value++
      scheduleNextPhase()
    } else {
      finish()
    }
  }

  /** 点击快进：跳到下一阶段，最后阶段时直接完成 */
  function fastForward() {
    if (isFinished.value)
      return
    clearTimer()
    if (currentPhase.value >= PHASES.length - 1) {
      finish()
    } else {
      advancePhase()
    }
  }

  function finish() {
    if (isFinished.value)
      return
    isFinished.value = true
    clearTimer()
    options.onComplete()
  }

  function clearTimer() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  onMounted(() => scheduleNextPhase())
  onUnmounted(() => clearTimer())

  return { currentPhase: readonly(currentPhase), isFinished: readonly(isFinished), fastForward }
}
