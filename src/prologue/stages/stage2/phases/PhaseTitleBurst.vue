<script setup lang="ts">
import { credits } from '../data/credits'

defineProps<{ active: boolean }>()
</script>

<template>
  <Transition name="title-fade">
    <div
      v-if="active"
      class="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <!-- 闪白层 -->
      <div class="flash-overlay" />

      <!-- 放射光晕 -->
      <div class="radial-glow" />

      <!-- 标题容器 -->
      <div class="title-container">
        <!-- TNO 八角外框 -->
        <div class="title-frame">
          <span class="corner corner-tl" />
          <span class="corner corner-tr" />
          <span class="corner corner-bl" />
          <span class="corner corner-br" />
        </div>

        <!-- 主标题 -->
        <h1 class="title-text">
          {{ credits.title }}
        </h1>

        <!-- 血红下划线 -->
        <div class="blood-line" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.title-fade-enter-active {
  transition: opacity 0.3s ease;
}
.title-fade-enter-from {
  opacity: 0;
}
.title-fade-leave-active {
  transition: opacity 0.4s ease;
}
.title-fade-leave-to {
  opacity: 0;
}

/* 闪白 */
.flash-overlay {
  position: absolute;
  inset: 0;
  background: white;
  opacity: 0;
  animation: flash 0.5s ease-out forwards;
  pointer-events: none;
  z-index: 2;
}

@keyframes flash {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.85;
  }
  100% {
    opacity: 0;
  }
}

/* 放射光晕 */
.radial-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(157, 78, 221, 0.25) 0%,
    rgba(74, 0, 128, 0.1) 35%,
    transparent 65%
  );
  opacity: 0;
  animation: glow-appear 1s ease-out 0.3s forwards;
}

@keyframes glow-appear {
  to {
    opacity: 1;
  }
}

/* 标题容器 */
.title-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: scale(0.5);
  filter: blur(4px);
  animation: title-burst 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
  z-index: 3;
}

@keyframes title-burst {
  50% {
    transform: scale(1.03);
    filter: blur(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    filter: blur(0);
    opacity: 1;
  }
}

/* 主标题 */
.title-text {
  font-size: clamp(24px, 5vw, 42px);
  font-weight: 700;
  letter-spacing: 4px;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(90deg, #e8e0f0 0%, #e8e0f0 35%, #ffffff 50%, #e8e0f0 65%, #e8e0f0 100%);
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 2s ease-in-out 0.8s;
  filter: drop-shadow(0 0 8px rgba(157, 78, 221, 0.6)) drop-shadow(0 0 25px rgba(157, 78, 221, 0.3))
    drop-shadow(0 0 50px rgba(74, 0, 128, 0.2));
}

@keyframes shimmer {
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: -200% center;
  }
}

/* TNO 外框 */
.title-frame {
  position: absolute;
  inset: -16px -24px;
  border: 1px solid rgba(0, 212, 170, 0.4);
  clip-path: polygon(
    0 8px,
    8px 0,
    calc(100% - 8px) 0,
    100% 8px,
    100% calc(100% - 8px),
    calc(100% - 8px) 100%,
    8px 100%,
    0 calc(100% - 8px)
  );
  opacity: 0;
  animation: frame-appear 0.6s ease-out 1s forwards;
}

@keyframes frame-appear {
  to {
    opacity: 1;
  }
}

/* 四角装饰 */
.corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: #00d4aa;
  border-style: solid;
  border-width: 0;
  opacity: 0;
  animation: corner-appear 0.3s ease-out 1.2s forwards;
}

.corner-tl {
  top: -1px;
  left: -1px;
  border-top-width: 2px;
  border-left-width: 2px;
}
.corner-tr {
  top: -1px;
  right: -1px;
  border-top-width: 2px;
  border-right-width: 2px;
}
.corner-bl {
  bottom: -1px;
  left: -1px;
  border-bottom-width: 2px;
  border-left-width: 2px;
}
.corner-br {
  bottom: -1px;
  right: -1px;
  border-bottom-width: 2px;
  border-right-width: 2px;
}

@keyframes corner-appear {
  to {
    opacity: 1;
  }
}

/* 血红下划线 */
.blood-line {
  margin-top: 14px;
  height: 2px;
  width: 0;
  background: #ff4444;
  box-shadow:
    0 0 8px rgba(255, 68, 68, 0.5),
    0 0 20px rgba(255, 68, 68, 0.2);
  animation:
    blood-grow 0.8s ease-out 1.1s forwards,
    blood-pulse 2s ease-in-out 1.9s infinite;
}

@keyframes blood-grow {
  to {
    width: clamp(160px, 30vw, 260px);
  }
}

@keyframes blood-pulse {
  0%,
  100% {
    box-shadow:
      0 0 8px rgba(255, 68, 68, 0.5),
      0 0 20px rgba(255, 68, 68, 0.2);
  }
  50% {
    box-shadow:
      0 0 14px rgba(255, 68, 68, 0.8),
      0 0 30px rgba(255, 68, 68, 0.4);
  }
}
</style>
