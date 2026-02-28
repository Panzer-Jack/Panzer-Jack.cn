<script setup lang="ts">
defineProps<{
  label: string
}>()

const emit = defineEmits<{
  click: [Event]
}>()

function handleClick(event: Event) {
  emit('click', event)
}
</script>

<template>
  <button
    class="button relative flex items-center gap-6px px-16px py-8px font-inherit text-14px cursor-pointer outline-none"
    @click.stop="handleClick"
  >
    <span class="corner corner-tl" />
    <span class="corner corner-br" />
    <span class="font-bold tracking-2px">{{ label }}</span>
    <span class="skip-icon text-12px">&gt;&gt;</span>
  </button>
</template>

<style scoped>
/* ========== TNO 风格按钮 ========== */
.button {
  background: rgba(10, 18, 26, 0.9);
  border: 1px solid #00d4aa;
  color: #8ba8a8;
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
  transition: all 0.2s ease;
}

.button:hover {
  color: #00ffcc;
  background: rgba(0, 212, 170, 0.15);
  border-color: #00ffcc;
  box-shadow: 0 0 15px rgba(0, 212, 170, 0.4);
  text-shadow: 0 0 8px rgba(0, 255, 204, 0.5);
}

.button:active {
  transform: scale(0.98);
}

/* ========== 角落装饰 ========== */
.corner {
  position: absolute;
  width: 6px;
  height: 6px;
  border: 1px solid #00d4aa;
  pointer-events: none;
}

.corner-tl {
  top: 3px;
  left: 3px;
  border-right: none;
  border-bottom: none;
}
.corner-br {
  bottom: 3px;
  right: 3px;
  border-left: none;
  border-top: none;
}

/* ========== 滑动动画图标 ========== */
.skip-icon {
  color: #00d4aa;
  animation: slide 1s infinite;
}

@keyframes slide {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(3px);
  }
}
</style>
