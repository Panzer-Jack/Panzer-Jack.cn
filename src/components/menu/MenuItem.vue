<script setup lang="ts">
import type { MenuItem } from '@/types/menu'

interface Props {
  item: MenuItem
  index?: number
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
  isActive: false,
})

const emit = defineEmits<{
  select: [item: MenuItem]
}>()

const animationDelay = computed(() => `${props.index * 0.08}s`)

function handleClick() {
  console.log(`Selected menu item: ${props.item.label}`, props.isActive)
  emit('select', props.item)
}
</script>

<template>
  <button
    class="
      menu-item relative w-full py-5px flex justify-center items-center
      text-16px font-medium tracking-widest text-center cursor-pointer transition-all duration-200 opacity-0
      tno-btn
      hover:(box-shadow-[0_0_15px_rgba(0,212,170,0.4)] text-shadow-[0_0_8px_rgba(0,255,204,0.5)])
      active:tno-btn-active"
    :class="{ 'tno-btn-active': isActive, 'tno-btn': !isActive }"
    :style="{ animationDelay }"
    @click="handleClick"
  >
    <span
      class="absolute w-[6px] h-[6px] border border-solid pointer-events-none top-[3px] left-[3px] border-r-0 border-b-0"
      :class="{ 'border-tno-active-border': isActive, 'border-tno-border': !isActive }"
    />
    <span
      class="absolute w-[6px] h-[6px] border border-solid pointer-events-none bottom-[3px] right-[3px] border-l-0 border-t-0"
      :class="{ 'border-tno-active-border': isActive, 'border-tno-border': !isActive }"
    />
    <span class="relative z-1">{{ item.label }}</span>
  </button>
</template>

<style scoped>
.menu-item {
  animation: slideIn 0.5s ease forwards;
  clip-path: polygon(
    0 4px,
    4px 0,
    calc(100% - 4px) 0,
    100% 4px,
    100% calc(100% - 4px),
    calc(100% - 4px) 100%,
    4px 100%,
    0 calc(100% - 4px)
  );
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes glowPulse {
  0%,
  100% {
    box-shadow:
      0 0 10px rgba(0, 212, 170, 0.5),
      0 0 20px rgba(0, 212, 170, 0.3),
      inset 0 0 10px rgba(0, 212, 170, 0.1);
  }
  50% {
    box-shadow:
      0 0 15px rgba(0, 212, 170, 0.7),
      0 0 30px rgba(0, 212, 170, 0.4),
      inset 0 0 15px rgba(0, 212, 170, 0.15);
  }
}
</style>
