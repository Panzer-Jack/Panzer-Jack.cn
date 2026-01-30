import { defineStore } from 'pinia'

export const usePrologueStore = defineStore('prologue', () => {
  // 当前 stage ID (从 stage2 开场动画开始)
  const currentStageId = ref<string>('stage1')

  // 是否正在过渡
  const isTransitioning = ref(false)

  // 是否完成全部
  const isComplete = ref(false)

  // 是否显示开场
  const shouldShowPrologue = ref(true)

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
    }
    else {
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
