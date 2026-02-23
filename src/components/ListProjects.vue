<script setup lang="ts">
import { useMobile } from '@/composables/useMobile'
import { projectCategories } from '@/data/projects'

const { isMobile } = useMobile()
</script>

<template>
  <div class="flex flex-col">
    <template
      v-for="(category, catIdx) in projectCategories"
      :key="category.name"
    >
      <!-- 分类标题 + 渐变分隔线 -->
      <div
        class="flex items-center gap-16px mb-0px"
        :class="catIdx === 0 ? 'mt-0' : 'mt-40px'"
      >
        <span class="font-[special-event] text-20px font-700 tracking-2px text-tno-primary [text-shadow:0_0_8px_rgba(0,212,170,0.4)] whitespace-nowrap">
          {{ category.name }}
        </span>
        <div class="flex-1 h-1px bg-gradient-to-r from-tno-primary/40 via-tno-primary/8 to-transparent" />
      </div>

      <!-- 项目卡片网格 -->
      <div
        class="grid gap-12px mt-16px"
        :class="isMobile ? 'grid-cols-1' : 'grid-cols-2'"
      >
        <a
          v-for="project in category.projects"
          :key="project.name"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-14px py-14px px-16px rounded-4px no-underline color-inherit transition-all duration-250 border-1px border-solid border-transparent hover:bg-tno-primary/4 hover:border-tno-primary/12 hover:shadow-[0_0_16px_rgba(0,212,170,0.06)]"
        >
          <!-- 图标 -->
          <div
            v-if="project.icon"
            class="text-24px text-tno-primary shrink-0 opacity-80"
            :class="project.icon"
          />

          <!-- 项目名称 + 描述 -->
          <div class="flex flex-col gap-2px overflow-hidden">
            <span class="text-14px font-600 text-tno-text truncate">
              {{ project.name }}
            </span>
            <span class="text-12px text-tno-text-muted truncate">
              {{ project.description }}
            </span>
          </div>
        </a>
      </div>
    </template>
  </div>
</template>
