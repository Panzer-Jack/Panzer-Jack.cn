<script setup lang="ts">
import type { StageProps } from '@/prologue/types/stage'
import { usePhaseTimeline } from './composables/usePhaseTimeline'
import PhaseAurora from './phases/PhaseAurora.vue'
import PhaseOutro from './phases/PhaseOutro.vue'
import PhaseTitleBurst from './phases/PhaseTitleBurst.vue'

defineProps<StageProps>()

const emit = defineEmits<{
  complete: []
}>()

const { currentPhase, fastForward } = usePhaseTimeline({
  onComplete: () => emit('complete'),
})

function handleClick() {
  fastForward()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleClick()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div
    class="fixed inset-0 bg-gothic-bg overflow-hidden cursor-pointer select-none"
    @click.stop="handleClick"
  >
    <!-- Phase 0 + 1: 黑幕呼吸 + 极光觉醒 -->
    <PhaseAurora :active="currentPhase <= 1" />

    <!-- Phase 2: 标题爆发 -->
    <PhaseTitleBurst :active="currentPhase === 2" />

    <!-- Phase 3: 收束归寂 -->
    <PhaseOutro :active="currentPhase === 3" />
  </div>
</template>
