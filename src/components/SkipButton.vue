<script setup lang="ts">
const emit = defineEmits<{
  skip: []
}>()

function handleSkip() {
  emit('skip')
}
</script>

<template>
  <button
    class="skip-button flex items-center gap-6px px-16px py-8px font-inherit text-14px text-text-secondary cursor-pointer bg-[rgba(13,10,14,0.8)] border border-solid border-gothic-border rounded-4px outline-none"
    @click.stop="handleSkip"
  >
    <span class="font-bold tracking-2px">SKIP</span>
    <span class="skip-icon text-12px">&gt;&gt;</span>
  </button>
</template>

<style scoped>
/* 过渡动画 - 必须保留 */
.skip-button {
  transition: all 0.2s ease;
}

.skip-button:hover {
  color: #e8e0f0;
  background: rgba(74, 0, 128, 0.4);
  border-color: #7b2cbf;
  box-shadow: 0 0 10px rgba(123, 44, 191, 0.3);
}

.skip-button:active {
  transform: scale(0.98);
}

/* 滑动动画 - 必须保留 */
.skip-icon {
  animation: slide 1s infinite;
}

@keyframes slide {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(3px); }
}
</style>
