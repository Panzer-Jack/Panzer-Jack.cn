<script setup lang="ts">
import type { Component } from 'vue'
import SkipButton from '@/components/SkipButton.vue'
import { getStageConfig } from '@/prologue/stages'
import { usePrologueStore } from '@/stores/prologue'

const store = usePrologueStore()

// 当前 stage 配置
const currentConfig = computed(() => getStageConfig(store.currentStageId))

// 动态组件
const CurrentStage = shallowRef<Component | null>(null)

// 加载当前 stage 组件
watch(
  () => store.currentStageId,
  async (id) => {
    const config = getStageConfig(id)
    if (config) {
      const module = await config.component()
      CurrentStage.value = module.default
    }
  },
  { immediate: true },
)

// stage 完成回调
function handleStageComplete() {
  const config = currentConfig.value
  store.completeCurrentStage(config?.nextStage)
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="!store.isComplete"
      class="prologue-container fixed inset-0 z-9999"
      :class="{ 'is-transitioning': store.isTransitioning }"
    >
      <!-- 跳过按钮 -->
      <div class="absolute top-20px right-20px z-10">
        <SkipButton @skip="store.skip" />
      </div>

      <!-- 动态 Stage -->
      <Transition :name="currentConfig?.transition?.enterClass ?? 'fade'" mode="out-in">
        <component
          :is="CurrentStage"
          v-if="CurrentStage"
          :key="store.currentStageId"
          :is-active="!store.isTransitioning"
          @complete="handleStageComplete"
        />
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
/* 过渡动画 */
.prologue-container {
  transition: opacity 0.5s ease;
}

.prologue-container.is-transitioning {
  opacity: 0;
}

/* Vue Transition 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
