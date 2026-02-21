import { defineStore } from 'pinia'

const PROLOGUE_COMPLETE_KEY = 'prologue-complete-at'
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000

function isPrologueRecentlyCompleted(): boolean {
  const timestamp = localStorage.getItem(PROLOGUE_COMPLETE_KEY)
  if (!timestamp) return false
  return Date.now() - Number(timestamp) < THREE_DAYS_MS
}

export const usePrologueStore = defineStore('prologue', () => {
  const recentlyCompleted = isPrologueRecentlyCompleted()

  // 当前 stage ID (从 stage2 开场动画开始)
  const currentStageId = ref<string>('stage1')

  // 是否正在过渡
  const isTransitioning = ref(false)

  // 是否完成全部（3天内播放过或跳过过则直接完成）
  const isComplete = ref(recentlyCompleted)

  // 是否显示开场
  const shouldShowPrologue = ref(!recentlyCompleted)

  // 计算属性
  const isMainMenu = computed(() => isComplete.value)

  /**
   * 切换到指定 stage
   */
  function goToStage(stageId: string) {
    isTransitioning.value = true
    setTimeout(() => {
      currentStageId.value = stageId
      isTransitioning.value = false
    }, 500)
  }

  /**
   * 完成当前 stage，进入下一个或结束
   */
  function completeCurrentStage(nextStageId?: string) {
    if (nextStageId) {
      goToStage(nextStageId)
    } else {
      completePrologue()
    }
  }

  /**
   * 完成全部开场
   */
  function completePrologue() {
    isTransitioning.value = true
    setTimeout(() => {
      isComplete.value = true
      isTransitioning.value = false
      localStorage.setItem(PROLOGUE_COMPLETE_KEY, String(Date.now()))
    }, 500)
  }

  /**
   * 跳过开场
   */
  function skip() {
    completePrologue()
  }

  /**
   * 重置（用于调试）
   */
  function reset() {
    currentStageId.value = 'stage2'
    isTransitioning.value = false
    isComplete.value = false
    shouldShowPrologue.value = true
    localStorage.removeItem(PROLOGUE_COMPLETE_KEY)
  }

  return {
    // 状态
    currentStageId,
    isTransitioning,
    isComplete,
    shouldShowPrologue,

    // 计算属性
    isMainMenu,

    // 方法
    goToStage,
    completeCurrentStage,
    completePrologue,
    skip,
    reset,
  }
})
