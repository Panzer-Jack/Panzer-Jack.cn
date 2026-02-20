<script setup lang="ts">
import containerInfoBg from '@/assets/images/container-info.png'
import { contactConfig } from '@/data/menuItems'
</script>

<template>
  <div class="flex flex-col items-center">
    <!-- 背景图作为尺寸基准 -->
    <img
      :src="containerInfoBg"
      class="w-300px h-auto block"
    >

    <!-- 内容区域 -->
    <div class="absolute inset-0 flex flex-col justify-center items-center px-24px py-16px">
      <!-- 标题 -->
      <h2 class="text-16px font-bold color-tno-accent mb-12px tracking-2px text-shadow-[0_0_8px_rgba(0,255,204,0.5)]">
        {{ contactConfig.title }}
      </h2>

      <!-- Email -->
      <a
        :href="`mailto:${contactConfig.email}`"
        class="flex items-center text-14px color-tno-text hover:color-tno-accent transition-colors mb-12px"
      >
        <i-object-email class="w-16px h-16px" />
        <span class="ml-4px">{{ contactConfig.email }}</span>
      </a>

      <!-- 社交链接 -->
      <div class="flex w-100px justify-between">
        <a
          v-for="link in contactConfig.socialLinks"
          :key="link.icon"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="color-tno-text hover:color-tno-accent transition-colors "
        >
          <i-object-github
            v-if="link.icon === 'github'"
            class="w-16px h-16px"
          />
          <i-object-bilibili
            v-else-if="link.icon === 'bilibili'"
            class="w-16px h-16px"
          />
          <i-object-x
            v-else-if="link.icon === 'x'"
            class="w-16px h-16px"
          />
          <i-object-rss
            v-else-if="link.icon === 'rss'"
            class="w-16px h-16px"
          />
        </a>
      </div>
    </div>
  </div>
</template>
