<script setup lang="ts">
import { credits } from '../data/credits'

defineProps<{ active: boolean }>()
</script>

<template>
  <Transition name="outro-fade">
    <div
      v-if="active"
      class="absolute inset-0 overflow-hidden"
    >
      <!-- CRT 扫描线 -->
      <div class="crt-sweep" />

      <!-- 终端文字 -->
      <div class="terminal-wrapper">
        <span class="terminal-text font-mono">
          {{ credits.terminalText }}
        </span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.outro-fade-enter-active {
  transition: opacity 0.3s ease;
}
.outro-fade-enter-from {
  opacity: 0;
}

/* CRT 扫描效果 */
.crt-sweep {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 3px;
  background: linear-gradient(180deg, transparent, rgba(0, 212, 170, 0.4), rgba(0, 212, 170, 0.15), transparent);
  box-shadow: 0 0 20px rgba(0, 212, 170, 0.3);
  animation: crt-sweep 1.5s ease-in-out forwards;
  pointer-events: none;
}

@keyframes crt-sweep {
  0% {
    top: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  85% {
    opacity: 0.6;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* 终端文字容器 */
.terminal-wrapper {
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation:
    terminal-appear 0.3s ease 0.5s forwards,
    terminal-disappear 0.4s ease 1.6s forwards;
}

@keyframes terminal-appear {
  to {
    opacity: 1;
  }
}

@keyframes terminal-disappear {
  to {
    opacity: 0;
  }
}

/* 终端打字机文字 */
.terminal-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  font-size: 14px;
  letter-spacing: 1.5px;
  color: #00d4aa;
  text-shadow: 0 0 6px rgba(0, 212, 170, 0.4);
  border-right: 2px solid #00d4aa;
  animation:
    typing 0.8s steps(35) 0.5s forwards,
    cursor-blink 0.6s step-end 0.5s infinite;
}

@keyframes typing {
  to {
    width: 100%;
  }
}

@keyframes cursor-blink {
  0%,
  100% {
    border-color: #00d4aa;
  }
  50% {
    border-color: transparent;
  }
}
</style>
