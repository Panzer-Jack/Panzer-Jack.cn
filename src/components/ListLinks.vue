<script setup lang="ts">
import { reactive } from 'vue'
import { useMobile } from '@/composables/useMobile'
import { friendLinks } from '@/data/links'

const { isMobile } = useMobile()

/** 记录头像加载失败的站点 */
const avatarFailed = reactive<Record<string, boolean>>({})

function onAvatarError(name: string) {
  avatarFailed[name] = true
}

/** 是否显示真实头像 */
function showAvatar(link: { name: string, avatar?: string }): boolean {
  return !!link.avatar && !avatarFailed[link.name]
}

/** 获取名称首字母 */
function getInitial(name: string): string {
  return name.charAt(0).toUpperCase()
}
</script>

<template>
  <div
    class="grid gap-12px"
    :class="isMobile ? 'grid-cols-1' : 'grid-cols-3'"
  >
    <a
      v-for="link in friendLinks"
      :key="link.name"
      :href="link.link"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-12px py-12px px-14px rounded-4px no-underline color-inherit transition-all duration-250 border-1px border-solid border-transparent hover:bg-tno-primary/4 hover:border-tno-primary/12 hover:shadow-[0_0_16px_rgba(0,212,170,0.06)]"
    >
      <!-- 圆形头像 -->
      <img
        v-if="showAvatar(link)"
        :src="link.avatar"
        :alt="link.name"
        class="shrink-0 w-40px h-40px rounded-full object-cover border-1px border-solid border-tno-primary/20"
        @error="onAvatarError(link.name)"
      >
      <!-- 首字母 fallback -->
      <div
        v-else
        class="shrink-0 w-40px h-40px rounded-full flex items-center justify-center bg-tno-primary/10 border-1px border-solid border-tno-primary/20 text-tno-primary text-16px font-700"
      >
        {{ getInitial(link.name) }}
      </div>

      <!-- 名称 + 描述 -->
      <div class="flex flex-col gap-2px overflow-hidden min-w-0">
        <span class="text-13px font-600 text-tno-text truncate">
          {{ link.name }}
        </span>
        <span class="text-11px text-tno-text-muted truncate">
          {{ link.description }}
        </span>
      </div>
    </a>
  </div>
</template>
