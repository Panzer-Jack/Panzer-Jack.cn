<script setup lang="ts">
interface Props {
  /** 说话者名字 */
  speaker?: string
  /** v-model 绑定的显示文本 */
  modelValue: string
  /** 是否正在打字 */
  typing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  speaker: '尤莉娅',
  typing: false,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

// 打字完成判断
const isComplete = computed(() => !props.typing && props.modelValue.length > 0)
</script>

<template>
  <div class="relative w-full max-w-100% cursor-pointer select-none">
    <!-- 角色名（在对话框外部） -->
    <div v-if="speaker" class="speaker-name absolute top-6px left-24px h-30px flex justify-center items-center px-16px py-4px z-20">
      <span class="text-14px font-bold tracking-2px">{{ speaker }}</span>
    </div>

    <!-- 主对话框 -->
    <div class="dialogue-box relative w-full px-24px py-24px mt-12px">
      <!-- TNO 角落装饰 -->
      <span class="corner-decor corner-tl" />
      <span class="corner-decor corner-tr" />
      <span class="corner-decor corner-bl" />
      <span class="corner-decor corner-br" />

      <!-- 对话内容 -->
      <div class="min-h-80px pt-20px relative z-10">
        <p class="dialogue-text text-14px tracking-1px">
          {{ modelValue }}<span v-if="typing" class="cursor">_</span>
        </p>
      </div>

      <!-- 继续提示 -->
      <div v-if="isComplete" class="absolute right-20px bottom-12px z-10">
        <span class="indicator-arrow text-14px">▼</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ========== TNO 风格主容器 ========== */
.dialogue-box {
  background: rgba(10, 18, 26, 0.95);
  border: 2px solid #00d4aa;
  clip-path: polygon(
    0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px,
    100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px)
  );
  box-shadow:
    0 0 20px rgba(0, 212, 170, 0.3),
    inset 0 0 40px rgba(0, 0, 0, 0.5),
    inset 0 0 0 1px rgba(0, 212, 170, 0.2);
  position: relative;
  overflow: hidden;
}

/* 扫描线纹理 */
.dialogue-box::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 212, 170, 0.03) 2px,
    rgba(0, 212, 170, 0.03) 4px
  );
  pointer-events: none;
  z-index: 1;
}

/* 扫描动画线 */
.dialogue-box::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 170, 0.5), transparent);
  animation: scan 3s linear infinite;
  z-index: 2;
}

@keyframes scan {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* ========== 角落装饰 ========== */
.corner-decor {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid #00d4aa;
  z-index: 5;
}

.corner-tl { top: 4px; left: 4px; border-right: none; border-bottom: none; }
.corner-tr { top: 4px; right: 4px; border-left: none; border-bottom: none; }
.corner-bl { bottom: 4px; left: 4px; border-right: none; border-top: none; }
.corner-br { bottom: 4px; right: 4px; border-left: none; border-top: none; }

/* ========== 名字标签 TNO 风格 ========== */
.speaker-name {
  background: rgba(10, 18, 26, 0.98);
  border: 1px solid #00d4aa;
  box-shadow: 0 0 10px rgba(0, 212, 170, 0.3);
  clip-path: polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px));
}

.speaker-name span {
  color: #00ffcc;
  text-shadow: 0 0 8px rgba(0, 255, 204, 0.5);
}

/* ========== 文字颜色 ========== */
.dialogue-text {
  color: #e8f0f0;
}

/* 终端风格光标 */
.cursor {
  color: #00ffcc;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(0, 255, 204, 0.6);
  animation: blink 0.8s step-end infinite;
}

/* 继续指示器 */
.indicator-arrow {
  color: #00d4aa;
  animation: bounce 0.8s infinite;
  text-shadow: 0 0 8px rgba(0, 212, 170, 0.6);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}
</style>
