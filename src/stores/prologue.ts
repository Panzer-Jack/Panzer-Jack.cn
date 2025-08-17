import { defineStore } from 'pinia'

export const usePrologueStore = defineStore('prologue', () => {
  const currentStage = ref(1)

  const isMainMenu = computed(() => {
    return currentStage.value === 4
  })

  const changeStage = (stage: number) => {
    currentStage.value = stage
  }

  return { currentStage, isMainMenu, changeStage }
})
