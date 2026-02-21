<script setup lang="ts">
import { credits } from '../data/credits'

defineProps<{ active: boolean }>()
</script>

<template>
  <Transition name="aurora-fade">
    <div
      v-show="active"
      class="absolute inset-0 overflow-hidden"
    >
      <!-- 中心光点呼吸 -->
      <div class="core-light" />

      <!-- 闪光层 -->
      <div class="flash-burst" />

      <!-- 极光层 (三色旋转) -->
      <div class="aurora aurora-violet" />
      <div class="aurora aurora-blood" />
      <div class="aurora aurora-teal" />

      <!-- 扫描线纹理 -->
      <div class="scanlines" />

      <!-- 装饰线 (上) -->
      <div class="deco-line deco-line-top" />
      <!-- 装饰线 (下) -->
      <div class="deco-line deco-line-bottom" />

      <!-- 文字 (竖排) -->
      <div class="char-name">
        {{ credits.str }}
      </div>

      <!-- 文字水印 -->
      <div class="char-watermark">
        {{ credits.strEN }}
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.aurora-fade-leave-active {
  transition: opacity 0.5s ease;
}
.aurora-fade-leave-to {
  opacity: 0;
}

/* 中心光点 */
.core-light {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(157, 78, 221, 0.4) 0%,
    rgba(74, 0, 128, 0.15) 25%,
    transparent 55%
  );
  animation: core-breathe 1.5s ease-in-out;
  will-change: transform, opacity;
}

@keyframes core-breathe {
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  50% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.8);
    opacity: 0.3;
  }
}

/* 过渡闪光 */
.flash-burst {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9) 0%, transparent 60%);
  opacity: 0;
  animation: flash-burst 0.3s ease-out 0.9s forwards;
  pointer-events: none;
}

@keyframes flash-burst {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  40% {
    opacity: 0.8;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}

/* 极光公共 */
.aurora {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  opacity: 0;
  filter: blur(50px);
  will-change: transform, opacity;
  animation: aurora-appear 1s ease-out 1s forwards;
  pointer-events: none;
}

@keyframes aurora-appear {
  to {
    opacity: 1;
  }
}

.aurora-violet {
  background: conic-gradient(
    from 0deg at 50% 50%,
    transparent 0deg,
    rgba(157, 78, 221, 0.35) 60deg,
    transparent 120deg,
    transparent 360deg
  );
  animation:
    aurora-appear 1s ease-out 1s forwards,
    aurora-rotate 10s linear 1s infinite;
}

.aurora-blood {
  background: conic-gradient(
    from 120deg at 50% 50%,
    transparent 0deg,
    rgba(139, 0, 0, 0.25) 60deg,
    transparent 120deg,
    transparent 360deg
  );
  animation:
    aurora-appear 1s ease-out 1.3s forwards,
    aurora-rotate 14s linear 1.3s infinite reverse;
}

.aurora-teal {
  background: conic-gradient(
    from 240deg at 50% 50%,
    transparent 0deg,
    rgba(0, 212, 170, 0.3) 60deg,
    transparent 120deg,
    transparent 360deg
  );
  animation:
    aurora-appear 1s ease-out 1.6s forwards,
    aurora-rotate 12s linear 1.6s infinite;
}

@keyframes aurora-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 扫描线 */
.scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 212, 170, 0.03) 2px,
    rgba(0, 212, 170, 0.03) 4px
  );
  opacity: 0;
  animation: fadeIn 1s ease 0.5s forwards;
  pointer-events: none;
}

/* 装饰线 */
.deco-line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 1px;
  width: 0;
  background: linear-gradient(90deg, transparent, #00d4aa, transparent);
  box-shadow: 0 0 8px rgba(0, 212, 170, 0.4);
  animation: line-expand 1.2s ease-out 1.5s forwards;
}

.deco-line-top {
  top: 18%;
}
.deco-line-bottom {
  bottom: 18%;
}

@keyframes line-expand {
  to {
    width: 70%;
  }
}

/* 角色名竖排 */
.char-name {
  position: absolute;
  right: 8%;
  top: 50%;
  transform: translateY(-50%) translateX(30px);
  writing-mode: vertical-rl;
  font-size: 20px;
  letter-spacing: 12px;
  color: #e8e0f0;
  text-shadow: 0 0 12px rgba(157, 78, 221, 0.6);
  opacity: 0;
  animation: slide-in-right 0.8s ease-out 2s forwards;
}

@keyframes slide-in-right {
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

/* 英文水印 */
.char-watermark {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16vw;
  font-weight: 900;
  letter-spacing: 2vw;
  color: rgba(0, 212, 170, 0.04);
  opacity: 0;
  animation: fadeIn 1.5s ease 2.2s forwards;
  pointer-events: none;
  user-select: none;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>
