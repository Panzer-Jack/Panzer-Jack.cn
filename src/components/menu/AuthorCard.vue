<script setup lang="ts">
import containerAuthorBg from '@/assets/images/container-author.png'
import { authorConfig } from '@/data/menuItems'

// 文章数量 - 可通过 props 传入或使用配置
interface Props {
  articleCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  articleCount: 0,
})

// 格式化数字为5位显示
const formattedCount = computed(() => {
  return String(props.articleCount).padStart(6, '0')
})
</script>

<template>
  <div class="flex flex-col justify-between items-center">
    <!-- 背景图作为尺寸基准，自动按比例缩放 -->
    <img
      :src="containerAuthorBg"
      class="w-300px h-auto block object-center"
    >

    <!-- 简介区域 -->
    <div class="absolute flex flex-col z-1 mt-250px w-230px">
      <h2 class="text-16px font-bold color-tno-accent mb-8px tracking-2px text-shadow-[0_0_8px_rgba(0,255,204,0.5)]">
        {{ authorConfig.title }}
      </h2>
      <p class="text-12px color-tno-text leading-relaxed">
        {{ authorConfig.description }}
      </p>
    </div>

    <!-- 数字显示器区域 -->
    <div class="relative bottom-31px right--60px flex z-1 gap-2px">
      <span
        v-for="(digit, index) in formattedCount"
        :key="index"
        class="w-15px h-24px flex items-center justify-center text-12px font-mono color-tno-active-text bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border-1px border-solid border-[#3a3a3a] rounded-2px [box-shadow:inset_0_1px_3px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.08)]"
      >
        {{ digit }}
      </span>
    </div>
  </div>
</template>
