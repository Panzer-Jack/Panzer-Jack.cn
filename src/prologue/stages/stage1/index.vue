<script setup lang="ts">
import type { StageProps } from '@/prologue/types/stage'
import DialogueScene from '@/components/DialogueScene.vue'
import { dialogueScript } from './scripts'

defineProps<StageProps>()

const emit = defineEmits<{
  complete: []
}>()
</script>

<template>
  <div class="fixed inset-0 flex flex-col items-center justify-end">
    <div class="stage-bg absolute inset-0 z--1" />

    <DialogueScene
      :scripts="dialogueScript"
      :speed="50"
      show-portrait
      @complete="emit('complete')"
    />
  </div>
</template>

<style scoped>
/* 渐变背景 */
.stage-bg {
  background: linear-gradient(180deg, #0d0a0e 0%, #1a1520 50%, #0d0a0e 100%);
}
</style>
