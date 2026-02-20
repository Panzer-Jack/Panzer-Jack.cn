<script setup lang="ts">
import type { StageProps } from '@/prologue/types/stage'

defineProps<StageProps>()
const emit = defineEmits<{ complete: [] }>()

onMounted(() => {
  const timer = setTimeout(() => emit('complete'), 10000)
  onUnmounted(() => clearTimeout(timer))
})
</script>

<template>
  <div class="opening-stage fixed inset-0 overflow-hidden">
    <!-- 背景层 -->
    <div class="opening-bg absolute inset-0">
      <div class="bg-base absolute inset-0" />
      <div class="glow-orb glow-violet absolute" />
      <div class="glow-orb glow-blood absolute" />
    </div>

    <!-- 放射光线层 -->
    <div class="rays-layer absolute inset-0 flex items-center justify-center">
      <div
        v-for="i in 6"
        :key="i"
        class="ray"
        :class="`ray-${i}`"
      >
        <span />
      </div>
    </div>

    <!-- 主内容层 -->
    <div class="content-layer absolute inset-0 flex flex-col items-center justify-center">
      <!-- 主标题 -->
      <div class="title-wrapper relative flex color-text-primary gap-x-5px">
        <i-text-老 class="title-char" />
        <i-text-船 class="title-char" />
        <i-text-长 class="title-char" />
        <i-text-PZ class="title-char" />
        <i-text-_ class="title-char" />
        <i-text-Jack class="title-char" />
      </div>

      <!-- 装饰线 -->
      <div class="divider-line" />

      <!-- 副标题 -->
      <div class="subtitle-row flex color-text-secondary gap-x-5px">
        <i-text-欢迎来到Panzer_Jack class="subtitle-char" />
        <i-text-の class="subtitle-char" />
        <i-text-博客 class="subtitle-char" />
      </div>

      <!-- 尤莉娅图标 -->
      <div class="yulia-icon">
        <i-object-yulia class="yulia-svg" />
      </div>
    </div>

    <!-- 装饰层 -->
    <div class="decor-layer absolute inset-0 pointer-events-none">
      <!-- 星星装饰 -->
      <div
        v-for="i in 5"
        :key="i"
        class="star"
        :class="`star-${i}`"
      />
    </div>

    <!-- 淡出遮罩 -->
    <div class="fadeout-mask absolute inset-0" />
  </div>
</template>

<style scoped>
/* ========== 背景层 ========== */
.bg-base {
  background: #000;
  animation: bgShift 3s ease forwards;
}

@keyframes bgShift {
  0% {
    background: #000;
  }
  100% {
    background: #0d0a0e;
  }
}

.glow-orb {
  width: 80vmax;
  height: 80vmax;
  top: calc(50% - 40vmax);
  left: calc(50% - 40vmax);
  border-radius: 50%;
  transform: scale(0);
  opacity: 0;
}

.glow-violet {
  background: radial-gradient(circle, rgba(74, 0, 128, 0.45) 0%, transparent 55%);
  animation: orbExpand 2s ease-out 0s forwards;
}

.glow-blood {
  background: radial-gradient(circle, rgba(139, 0, 0, 0.25) 0%, transparent 45%);
  animation: orbExpand 2s ease-out 0.3s forwards;
}

@keyframes orbExpand {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

/* ========== 放射光线 ========== */
.rays-layer {
  animation: fadeOut 1s ease 3.5s forwards;
}

.ray {
  position: absolute;
  width: 2px;
  height: 45vmax;
  bottom: 50%;
  left: calc(50% - 1px);
  transform-origin: center bottom;
  overflow: hidden;
}

.ray span {
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(157, 78, 221, 0.6), transparent);
  transform: translateY(100%);
  animation: raySlide 0.6s ease-out forwards;
}

.ray-1 {
  transform: rotate(0deg);
}
.ray-1 span {
  animation-delay: 2s;
}
.ray-2 {
  transform: rotate(60deg);
}
.ray-2 span {
  animation-delay: 2.1s;
}
.ray-3 {
  transform: rotate(120deg);
}
.ray-3 span {
  animation-delay: 2.2s;
}
.ray-4 {
  transform: rotate(180deg);
}
.ray-4 span {
  animation-delay: 2.3s;
}
.ray-5 {
  transform: rotate(240deg);
}
.ray-5 span {
  animation-delay: 2.4s;
}
.ray-6 {
  transform: rotate(300deg);
}
.ray-6 span {
  animation-delay: 2.5s;
}

@keyframes raySlide {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

/* ========== 主标题 ========== */
.title-wrapper {
  opacity: 0;
  filter: blur(20px) drop-shadow(0 0 30px rgba(123, 44, 191, 0.6));
  transform: scale(0.8);
  animation: titleBounce 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 4s forwards;
}

.title-char {
  height: clamp(40px, 8vw, 70px);
}

@keyframes titleBounce {
  0% {
    opacity: 0;
    filter: blur(20px);
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    filter: blur(0);
    transform: scale(1.08);
  }
  70% {
    transform: scale(0.97);
  }
  85% {
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    filter: blur(0) drop-shadow(0 0 30px rgba(123, 44, 191, 0.6));
    transform: scale(1);
  }
}

/* 标题光晕脉冲 */
.title-wrapper::after {
  content: '';
  position: absolute;
  inset: -20px;
  border-radius: 12px;
  opacity: 0;
  animation: titleGlow 2s ease-in-out 5.2s forwards;
}

@keyframes titleGlow {
  0% {
    opacity: 0;
    box-shadow: 0 0 0 rgba(123, 44, 191, 0);
  }
  50% {
    opacity: 1;
    box-shadow:
      0 0 60px rgba(123, 44, 191, 0.5),
      0 0 120px rgba(123, 44, 191, 0.2);
  }
  100% {
    opacity: 0.6;
    box-shadow: 0 0 30px rgba(123, 44, 191, 0.3);
  }
}

/* ========== 装饰线 ========== */
.divider-line {
  width: 0;
  height: 2px;
  margin-top: 16px;
  background: linear-gradient(90deg, transparent, #7b2cbf, transparent);
  animation: lineExpand 0.8s ease-out 5.4s forwards;
}

@keyframes lineExpand {
  0% {
    width: 0;
    opacity: 0;
  }
  100% {
    width: clamp(120px, 30vw, 300px);
    opacity: 1;
  }
}

/* ========== 副标题行 ========== */
.subtitle-row {
  align-items: center;
  margin-top: 18px;
  opacity: 0;
  animation: subtitleReveal 0.8s ease-out 6s forwards;
}

.subtitle-char {
  height: clamp(20px, 4vw, 36px);
}

@keyframes subtitleReveal {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  60% {
    opacity: 1;
    transform: translateY(-2px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========== 尤莉娅图标 ========== */
.yulia-icon {
  margin-top: 24px;
  opacity: 0;
  animation: yuliaAppear 0.8s ease-out 6.8s forwards;
}

.yulia-svg {
  height: clamp(40px, 6vw, 60px);
  color: #9d4edd;
  filter: drop-shadow(0 0 10px rgba(157, 78, 221, 0.5));
}

@keyframes yuliaAppear {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* ========== 星星装饰 ========== */
.star {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #9d4edd;
  opacity: 0;
  box-shadow: 0 0 8px rgba(157, 78, 221, 0.8);
}

.star-1 {
  top: 22%;
  right: 18%;
  animation:
    starPop 0.4s ease 7.2s forwards,
    starTwinkle 2s ease-in-out 7.6s infinite;
}
.star-2 {
  top: 38%;
  left: 14%;
  animation:
    starPop 0.4s ease 7.5s forwards,
    starTwinkle 2.2s ease-in-out 7.9s infinite;
}
.star-3 {
  bottom: 28%;
  right: 22%;
  animation:
    starPop 0.4s ease 7.8s forwards,
    starTwinkle 1.8s ease-in-out 8.2s infinite;
}
.star-4 {
  top: 14%;
  left: 32%;
  animation:
    starPop 0.4s ease 8s forwards,
    starTwinkle 2.4s ease-in-out 8.4s infinite;
}
.star-5 {
  bottom: 35%;
  right: 35%;
  animation:
    starPop 0.4s ease 8.2s forwards,
    starTwinkle 2s ease-in-out 8.6s infinite;
}

@keyframes starPop {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  60% {
    transform: scale(1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes starTwinkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

/* ========== 退出淡出 ========== */
.fadeout-mask {
  background: #0d0a0e;
  opacity: 0;
  pointer-events: none;
  animation: maskFadeIn 1s ease 9s forwards;
}

@keyframes maskFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
